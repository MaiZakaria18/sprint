from django.urls import path
from .views import TaskCreateView, TaskUpdateView, TaskDeleteView, TaskListView

urlpatterns = [
    path('projects/<int:project_id>/tasks/',
         TaskListView.as_view(), name='task-list'),
    path('projects/<int:project_id>/tasks/create/',
         TaskCreateView.as_view(), name='task-create'),
    path('projects/<int:project_id>/tasks/<int:pk>/update/',
         TaskUpdateView.as_view(), name='task-update'),
    path('projects/<int:project_id>/tasks/<int:pk>/delete/',
         TaskDeleteView.as_view(), name='task-delete'),
]
