from rest_framework import serializers
from .models import Task, CustomUser


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
        # Get usernames for assigned users
        return [user.username for user in obj.assigned_to.all()]

    def validate(self, data):
        # Validate title uniqueness within the same project
        title = data.get('title')
        project = data.get('project')

        if title and project and Task.objects.filter(title=title, project=project).exists():
            raise serializers.ValidationError(
                {"title": "A task with this title already exists in this project."}
            )

        # Validate date fields
        start_date = data.get('start_date')
        due_date = data.get('due_date')

        if start_date and due_date and start_date > due_date:
            raise serializers.ValidationError(
                {"due_date": "Due date must be after the start date."}
            )

        return data
