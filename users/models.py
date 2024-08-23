from django.contrib.auth.models import AbstractUser, Group
from django.db import models


class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('junior', 'Junior'),
        ('manager', 'Manager'),
        ('senior', 'Senior'),
        ('super_admin', 'Super Admin'),
    ]

    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=20, choices=ROLE_CHOICES, default='junior')

    def __str__(self):
        return self.username
