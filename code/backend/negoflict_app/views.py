from core.serializers import UserCreateSerializer
from core.models import User
from .serializers import MediatorSerializer, AddressMediatorSerializer, AddressSerializer
from .models import Mediator, Address, AddressMediator
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from . import permissions


class UserView(ModelViewSet):
    permission_classes=[permissions.IsStaff]
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer


class MediatorView(ModelViewSet):
    queryset = Mediator.objects.all()
    # serializer_class = MediatorSerializer
    permission_classes=[permissions.IsAdminOrUser]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return UserCreateSerializer
        return MediatorSerializer

   
    @action(detail=False, methods=['GET','PUT'])
    def me(self, request):
       
        (mediator,created) = Mediator.objects.get_or_create(user_id = request.user.id )
        user = User.objects.get(pk= request.user.id)

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

    @action(detail=False, methods=['POST'])
    def new_user(self,request):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)        



class AddressView(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes=[permissions.IsAdminOrUser]

class AddressUserView(ModelViewSet):
    queryset = AddressMediator.objects.all()
    serializer_class = AddressMediatorSerializer
    permission_classes=[permissions.IsAdminOrUser]






