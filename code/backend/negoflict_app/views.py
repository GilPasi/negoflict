from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.generics import ListCreateAPIView
from core.serializers import UserCreateSerializer
from core.models import User
from .serializers import MediatorSerializer, AddressMediatorSerializer, AddressSerializer
from .models import Mediator, Address, AddressMediator
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from . import permissions




class CreateUser(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

   


class CreateMediator(ModelViewSet):
    queryset = Mediator.objects.all()
    serializer_class = MediatorSerializer
    permission_classes=[permissions.IsAdminOrUser]

    
    
   
    @action(detail=False, methods=['GET','PUT'])
    def me(self, request):
       
        (mediator,created) = Mediator.objects.get_or_create(user_id = 2)
        user = User.objects.get(pk= 2)

        if request.method == 'GET':
            serializerMediator = MediatorSerializer(mediator)
            serializerUser = UserCreateSerializer(user)
            return Response(['user:',serializerUser.data,'mediator:',serializerMediator.data])
        
        elif request.method == 'PUT':
            serializerMediator = MediatorSerializer(mediator, data=request.data)
            serializerMediator.is_valid(raise_exception=True)
            serializerMediator.save()
            return Response(serializerMediator.data)

        return None
        



class CreateAddress(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

class CreateAddressUser(ModelViewSet):
    queryset = AddressMediator.objects.all()
    serializer_class = AddressMediatorSerializer






