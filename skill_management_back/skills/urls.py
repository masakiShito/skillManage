from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, SkillViewSet, UserSkillViewSet, LearningLogViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'user-skills', UserSkillViewSet)
router.register(r'learning-logs', LearningLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
