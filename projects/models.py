from django.db import models
from users.models import CustomUser

class Project(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    # One-to-Many relationship with User
    created_by = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='projects')


    def __str__(self):
        return self.name
