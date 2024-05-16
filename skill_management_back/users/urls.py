from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CustomUserViewSet, OrganizationViewSet, UserDetailView, DashboardView

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'organizations', OrganizationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),  # ダッシュボードエンドポイント
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),  # ユーザー詳細と更新エンドポイント
]
