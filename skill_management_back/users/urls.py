from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import CustomUserViewSet, OrganizationViewSet, UserDetailView

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'organizations', OrganizationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', TokenObtainPairView.as_view(), name='login'),  # LoginViewをTokenObtainPairViewに変更
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
]
