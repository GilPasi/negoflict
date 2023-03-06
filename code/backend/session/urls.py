from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()


router.register('case',views.CaseView)
router.register('chat_users',views.AgoraUserView)

urlpatterns = router.urls