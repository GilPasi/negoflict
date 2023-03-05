from core.serializers import UserCreateSerializer, UserSerializer
from core.models import User
from .serializers import MediatorSerializer, AddressMediatorSerializer, AddressSerializer
from .models import Mediator, Address, AddressMediator
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from . import permissions
from rest_framework import permissions as perm
from rest_framework import status
from django.forms.models import model_to_dict




class UserView(ModelViewSet):
    permission_classes=[permissions.IsAdminOrUser]
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    
    def get_permissions(self):
        if not self.request.method == 'GET':
            self.permission_classes = [permissions.IsSuperUser]
        return super().get_permissions()
    
    def get_queryset(self):
        if not self.request.user.is_superuser:
            return User.objects.none()
        return super().get_queryset()
    
    @action(detail=False,methods=['GET'],permission_classes=[permissions.All])
    def is_email_exist(self,request):
        email = request.GET.get('email',None)
        print(email)
        if email:
            try:
                answer = self.queryset.get(email=email)
                if answer:
                    return Response('ok', status=status.HTTP_200_OK)
            except:
                pass
                
        return Response('Not exist',status=status.HTTP_404_NOT_FOUND)
            
            
    
    
    @action(detail=False,methods=['GET'],permission_classes=[permissions.IsAdminOrUser])
    def get_user(self,request):
        username = request.GET.get('username',None)
        if username:
            userId = self.queryset.get(username=username)
            serializer = UserCreateSerializer(userId)
            print(serializer.data)
        else:
            return Response('Not found',status=status.HTTP_404_NOT_FOUND)
            
        return Response(serializer.data, status=status.HTTP_200_OK)

    
 
    
  
class MediatorView(ModelViewSet):
    queryset = Mediator.objects.select_related('user').all()
    serializer_class = MediatorSerializer
    permission_classes=[permissions.IsAdminOrUser]
    
    def get_permissions(self):
        if not self.request.method == 'GET':
            self.permission_classes = [permissions.IsSuperUser]
        return super().get_permissions()
    
    def get_queryset(self):
        if not self.request.user.is_superuser:
            return Mediator.objects.none()
        return super().get_queryset()
    
    
    
    def create(self, request, *args, **kwargs):
        user_data = {key[5:]: value for key, value in request.data.items() if key.startswith('user') }
        user_data['is_staff'] = True
        serializer =UserCreateSerializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        user_instanse =serializer.save()
        
        
        
        
        new_object = Mediator.objects.create(
            phone = request.data.get('phone'),
            education = request.data.get('education'),
            relevant_experience = request.data.get('relevant_experience'),
            mediation_areas = request.data.get('mediation_areas'),
            certification_course = bool(request.data.get('certification_course')),
            user = user_instanse
        )
        mediator = MediatorSerializer(new_object).data
        
        
        return Response({'mediator':mediator}, status=status.HTTP_201_CREATED)
    
    @action(detail=False,methods=['GET','PUT'],permission_classes=[permissions.IsStaff])
    def me(self,request):
        me = Mediator.objects.select_related('user').all().get(pk=self.request.user.id)
        serializer = MediatorSerializer(me)
        return Response(serializer.data,status=status.HTTP_302_FOUND)
    
    
 
class AddressView(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes=[permissions.IsAdminOrUser]

class AddressUserView(ModelViewSet):
    queryset = AddressMediator.objects.all()
    serializer_class = AddressMediatorSerializer
    permission_classes=[permissions.IsAdminOrUser]






