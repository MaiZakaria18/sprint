from django.urls import path
from .views import TaskCreateView, TaskUpdateView, TaskDeleteView, TaskListView

urlpatterns = [
    path('projects/<int:project_id>/tasks/',
         TaskCreateView.as_view(), name='task-create'),
    path('projects/<int:project_id>/tasks/<int:pk>/',
         TaskUpdateView.as_view(), name='task-update'),
    path('projects/<int:project_id>/tasks/<int:pk>/',
         TaskDeleteView.as_view(), name='task-delete'),
    path('projects/<int:project_id>/tasks/',
         TaskListView.as_view(), name='task-list'),
]
