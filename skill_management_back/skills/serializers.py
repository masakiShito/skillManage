from rest_framework import serializers
from .models import Category, Skill, UserSkill, LearningLog

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Skill
        fields = '__all__'

class UserSkillSerializer(serializers.ModelSerializer):
    skill = SkillSerializer(read_only=True)

    class Meta:
        model = UserSkill
        fields = '__all__'

class LearningLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningLog
        fields = '__all__'
