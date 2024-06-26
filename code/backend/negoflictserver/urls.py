"""negoflictserver URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, include

prefix_url = settings.API_PREFIX

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f"{prefix_url}api-auth/", include('rest_framework.urls')),
    path('__debug__/', include('debug_toolbar.urls')),
    path(f"{prefix_url}auth/", include('djoser.urls')),
    path(f"{prefix_url}auth/", include('djoser.urls.jwt')),
    path(f"{prefix_url}users/", include('negoflict_app.urls')),
    path(f"{prefix_url}session/", include('session.urls')),
    path(f"{prefix_url}core/", include('core.urls')),
    path(f"{prefix_url}agora/", include('agora.urls')),

]
