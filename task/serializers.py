from rest_framework import serializers
from .models import Task, CustomUser
from datetime import date


class TaskSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(
        many=True, queryset=CustomUser.objects.all(), write_only=True, required=False
    )
    assigned_to_display = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            'title', 'description', 'status', 'priority',
            'assigned_to', 'assigned_to_display', 'start_date', 'due_date', 'id'
        ]

    def get_assigned_to_display(self, obj):
        return [user.username for user in obj.assigned_to.all()]

    def validate(self, data):
        title = data.get('title')
        project = data.get('project')

        if title and project and Task.objects.filter(title=title, project=project).exists():
            raise serializers.ValidationError(
                {"title": "A task with this title already exists in this project."}
            )

        start_date = data.get('start_date')
        due_date = data.get('due_date')

        # Validate that start_date and due_date are not in the past
        if start_date and start_date < date.today():
            raise serializers.ValidationError(
                {"start_date": "Start date cannot be in the past."}
            )

        if due_date and due_date < date.today():
            raise serializers.ValidationError(
                {"due_date": "Due date cannot be in the past."}
            )

        if start_date and due_date and start_date > due_date:
            raise serializers.ValidationError(
                {"due_date": "Due date must be after the start date."}
            )

        return data
