from django.contrib import admin
from .models import Category, Skill, UserSkill, LearningLog

admin.site.register(Category)
admin.site.register(Skill)
admin.site.register(UserSkill)
admin.site.register(LearningLog)
