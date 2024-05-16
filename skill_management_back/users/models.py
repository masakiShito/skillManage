# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    nickname = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.username

class Organization(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='organizations')
    company_name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='organization_created_by')
    updated_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='organization_updated_by')
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.company_name} - {self.position}"
