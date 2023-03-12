from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView
from .views import CustomTokenObtainPairView,CustomTokenRefreshView,CustomDeleteCookieView
from django.urls import path



urlpatterns = [
    path('auth/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/',CustomDeleteCookieView.as_view(),name='delete_cookie')


]