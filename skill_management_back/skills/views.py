from rest_framework import viewsets, permissions
from .models import Category, Skill, UserSkill, LearningLog
from .serializers import CategorySerializer, SkillSerializer, UserSkillSerializer, LearningLogSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserSkillViewSet(viewsets.ModelViewSet):
    queryset = UserSkill.objects.all()
    serializer_class = UserSkillSerializer
    permission_classes = [permissions.IsAuthenticated]

class LearningLogViewSet(viewsets.ModelViewSet):
    queryset = LearningLog.objects.all()
    serializer_class = LearningLogSerializer
    permission_classes = [permissions.IsAuthenticated]
