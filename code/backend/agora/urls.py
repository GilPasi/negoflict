from django.urls import path
from .views import Get_Token


urlpatterns = [
    path('/get_token/user/',Get_Token.as_view(),kwargs={'token_type':'user'}),
    path('/get_token/app/', Get_Token.as_view(), kwargs={'token_type': 'app'})
]