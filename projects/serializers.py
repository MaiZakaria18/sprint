from rest_framework import serializers
from .models import Project
from task.serializers import TaskSerializer
from datetime import date


class ProjectSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    created_by = serializers.ReadOnlyField(source='created_by.username')

    class Meta:
        model = Project
        fields = '__all__'

    def validate(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')

        # Check if the start date is in the past
        if start_date and start_date < date.today():
            raise serializers.ValidationError(
                "Start date cannot be in the past.")

        # Check if the end date is before the start date
        if end_date and start_date and end_date < start_date:
            raise serializers.ValidationError(
                "End date cannot be before the start date.")

        return data
