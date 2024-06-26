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
from .models import category
from session.models import Contact
from requests.exceptions import RequestException
from django.contrib.auth.hashers import make_password



class UserView(ModelViewSet):
    permission_classes=[permissions.IsAdminOrUser]
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    
    def get_serializer_class(self):
        if self.request.method == 'PATCH':
            return UserSerializer
        return UserCreateSerializer
    
    def get_permissions(self):
        if not self.request.method == 'GET':
            self.permission_classes = [permissions.IsAdminOrUser]
        return super().get_permissions()
    
    def get_queryset(self):
        if self.request.method == 'DELETE' and self.request.user.is_staff:
            return User.objects.all()
        
        if self.request.user or self.request.user.is_staff and not  self.request.user.is_superuser:
            return User.objects.filter(pk=self.request.user.pk)
        
        return super().get_queryset()
    
    @action(detail=False,methods=['GET'],permission_classes=[permissions.IsAdminOrUser])
    def is_email_exist(self,request):
        email = request.GET.get('email',None)
        if email:
            try:
                answer = self.queryset.get(email=email)
                if answer:
                    return Response(True, status=status.HTTP_200_OK)
            except:
                return Response(False, status=status.HTTP_200_OK)
                
        return Response('Bad request missing email',status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False,methods=['GET'],permission_classes=[permissions.IsAdminOrUser])
    def role(self,request):
        id = request.GET.get('id',None)
        if id:
            try:
                user = self.queryset.get(pk=id)
                if user.is_superuser:
                    return Response({'role':1},status=status.HTTP_200_OK)
                elif user.is_staff:
                    return Response({'role':2},status=status.HTTP_200_OK)
                else:
                    return Response({'role':3},status=status.HTTP_200_OK)
            except:
                return Response('cant find user',status=status.HTTP_404_NOT_FOUND)
        return Response('id cant be null',status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False,methods=['GET'],permission_classes=[permissions.IsStaff])
    def get_all_users_not_related(self,request):
        
        contact_user_ids = Contact.objects.filter(mediator=self.request.user.id).values_list('user_id', flat=True)
        if contact_user_ids:
            users = User.objects.filter(is_staff=False).exclude(id__in=contact_user_ids)
        else:
            users = User.objects.filter(is_staff=False)
        if not users:
            return Response('no users found',status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False,methods=['GET'],permission_classes=[permissions.IsSuperUser])
    def get_all_users(self,request):
        try:
            queryset = User.objects.all().exclude(is_superuser=True)
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e,status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False,methods=['PUT'],permission_classes=[permissions.IsAdminOrUser])
    def changing_password(self,request):
        userId = request.data.get('id',None)
        new_password = request.data.get('password',None)
        
        missing_props = {
            **({'error':'missing id'}if not userId else {}),
            **({'error': 'missing password'} if not new_password else {}),
        }
        
        if len(missing_props.keys()) > 0:
            return Response(missing_props,status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = self.queryset.get(pk=userId)
            if not user:
                return Response('user not found',status=status.HTTP_404_NOT_FOUND)
            user.password = make_password(new_password)
            user.save()
            return Response({"success": "Password changed successfully"},status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e,status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False,methods=['PUT'],permission_classes=[permissions.IsSuperUser])
    def change_first_entry_attribute(self,request):
        userId = request.data.get('id',None)
        if not userId:
            return Response('missing id',status=status.HTTP_400_BAD_REQUEST)
        
        user = self.queryset.get(pk=userId)
        if not user:
            return Response('user not found',status=status.HTTP_404_NOT_FOUND)
        try:
            serializer = UserSerializer(user,data={'first_logged':True},partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response('SOMTHING WENT WRONG',status=status.HTTP_400_BAD_REQUEST)
        
        
    @action(detail=False,methods=['GET'],permission_classes=[permissions.IsAdminOrUser])
    def get_user(self,request):
        username = request.GET.get('username',None)
      
        if username:
            
            userId = self.queryset.get(username=username)
            if not userId:
                return Response('user not found', status=status.HTTP_400_BAD_REQUEST)
            serializer = UserCreateSerializer(userId)
            print(serializer.data)
        else:
            return Response('Not found',status=status.HTTP_404_NOT_FOUND)
            
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False,methods=['GET'],permission_classes=[permissions.IsSuperUser])
    def get_user_by_id(self, request):
        id = request.GET.get('id',None)
        
        if not id:
            return Response('id is missing', status=status.HTTP_400_BAD_REQUEST)
        try:
            user = self.queryset.get(id=id)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=200)
            
        except RequestException as e:
             return Response(f"User not found {e}")
         

    
    
    
    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAdminOrUser])
    def is_username_exist(self,request):
        username = request.GET.get('username',None)
        
        
        
        
        if username:
            user = self.queryset.filter(username=username).exists()
            if user:
               return  Response(True, status=status.HTTP_200_OK)
            else:
                return Response(False, status=status.HTTP_200_OK)
        return Response('bad request', status=status.HTTP_400_BAD_REQUEST)
        
    
    
    
    @action(detail=False,methods=['POST','GET'],permission_classes=[permissions.IsAdminOrUser])
    def create_users(self,request):
        data = request.data
        
        created_users =[]
        
        for user_data in data:
            serializer = self.get_serializer(data=user_data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            created_users.append(serializer.data)
        
        return Response(created_users, status=status.HTTP_201_CREATED)

    
 
    
  
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
        user_data = {key[5:]: value for key, value in request.data.items() if key.startswith('user')}
        serializer =UserCreateSerializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        user_instanse =serializer.save()
        user_instanse.is_staff =True
        user_instanse.save()
        
        meditaton_area =  request.data.get('mediation_areas')
        
        for key, value in category.MEDIATION_CHOICES:
            if value == meditaton_area:
                choice_area = key
                
        if not choice_area:
            return Response('bad choice area',status=status.HTTP_400_BAD_REQUEST)
                
        
        
        new_object = Mediator.objects.create(
            phone = request.data.get('phone'),
            education = request.data.get('education'),
            relevant_experience = request.data.get('relevant_experience'),
            mediation_areas = choice_area,
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
    
    @action(detail=False,methods=['GET'],permission_classes=[permissions.IsAdminOrUser])
    def my_mediator(self,request):
        id = request.GET.get('id',None)
        if id:
            user = self.queryset.get(user__id=id)
            if user:
                serializer = MediatorSerializer(user)
                return Response(serializer.data,status=status.HTTP_200_OK)
            return Response('cant find user', status=status.HTTP_404_NOT_FOUND)
        return Response('bad request', status=status.HTTP_400_BAD_REQUEST)
            
    

    
    
 
class AddressView(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes=[permissions.IsAdminOrUser]
    
    def create(self, request, *args, **kwargs):
        city = request.data.get('city')
        
        if city:
            instence = self.queryset.filter(city=city).first()
            if instence:
                serializer = AddressSerializer(instence)
                return Response(serializer.data, status=status.HTTP_200_OK)
        return super().create(request, *args, **kwargs)
    
    

class AddressUserView(ModelViewSet):
    queryset = AddressMediator.objects.all()
    serializer_class = AddressMediatorSerializer
    permission_classes=[permissions.IsAdminOrUser]
    
    
    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAdminOrUser])
    def get_mediator_address(self, request):
        mediator_id = request.GET.get('mediator', None)
        if not mediator_id:
            return Response('bad request', status=status.HTTP_400_BAD_REQUEST)
        
        try:
            mediator = self.queryset.select_related('address').get(mediator=mediator_id)
            if mediator and mediator.address:
                serializer = AddressSerializer(mediator.address)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response('cant find address', status=status.HTTP_404_NOT_FOUND)
        except RequestException as e:
            return Response(f"Address not found {e}")







