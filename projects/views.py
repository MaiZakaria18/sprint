from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.permissions import IsAuthenticated


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter projects by the custom user who created them
        return Project.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the 'created_by' field to the currently authenticated custom user
        serializer.save(created_by=self.request.user)
