# skills/serializers.py
from rest_framework import serializers
from .models import Category, Skill, UserSkill, LearningLog

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class UserSkillSerializer(serializers.ModelSerializer):
    skill_name = serializers.ReadOnlyField(source='skill.name')

    class Meta:
        model = UserSkill
        fields = '__all__'

class LearningLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningLog
        fields = '__all__'
