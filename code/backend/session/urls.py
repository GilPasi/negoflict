from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()


router.register('case',views.CaseView)
router.register('chat_group',views.GroupChatView)
router.register('chat_members',views.GroupMemberView)
router.register('message',views.MessageView)
router.register('contact',views.ContactView)
router.register('survey',views.SurveyView)

urlpatterns = router.urls