from rest_framework import serializers
from .models import Task
from users.models import CustomUser  # Import CustomUser from your user app


class TaskSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(
        many=True, queryset=CustomUser.objects.all())  # Update to use CustomUser

    class Meta:
        model = Task
        fields = ['title', 'description', 'status', 'priority',
                  'assigned_to', 'start_date', 'due_date', 'id']  # Include 'project' in fields

    def validate(self, data):
        # Check if a task with the same title already exists within the same project
        title = data.get('title')
        project = data.get('project')

        if Task.objects.filter(title=title, project=project).exists():
            raise serializers.ValidationError(
                {"title": "A task with this title already exists in this project."})

        return data
