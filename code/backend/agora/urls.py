from django.urls import path
from .views import Get_Token, Groups, Users
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('groups',Groups,basename='groups')
router.register('users',Users,basename='users')


urlpatterns = [
    path('get_token/user/',Get_Token.as_view(),kwargs={'token_type':'user'}),
    path('get_token/app/', Get_Token.as_view(), kwargs={'token_type': 'app'}),

]+ router.urls

