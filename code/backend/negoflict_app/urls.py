from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()

router.register('user_view',views.UserView)
router.register('mediator_view',views.MediatorView)
router.register('address_views',views.AddressView)
router.register('address_mediator',views.AddressUserView)

urlpatterns = router.urls
# [
#     # path('createUser/',views.CreateUser.as_view()),
#     # path('createMediator/',views.CreateMediator.as_view()),

# ]