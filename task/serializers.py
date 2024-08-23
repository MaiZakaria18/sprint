from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'description', 'status', 'priority',
                  'assigned_to', 'start_date', 'due_date']

    def validate(self, data):
        # Check if a task with the same title already exists within the same project
        title = data.get('title')
        project = data.get('project')

        if Task.objects.filter(title=title, project=project).exists():
            raise serializers.ValidationError(
                {"title": "A task with this title already exists in this project."})

        return data
