from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()

router.register('user_view',views.CreateUser)
router.register('mediator_view',views.CreateMediator)
router.register('address_views',views.CreateAddress)
router.register('address_mediator',views.CreateAddressUser)

urlpatterns = router.urls
# [
#     # path('createUser/',views.CreateUser.as_view()),
#     # path('createMediator/',views.CreateMediator.as_view()),

# ]