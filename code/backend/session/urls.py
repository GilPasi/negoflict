from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()


router.register('',views.CaseView)

urlpatterns = router.urls