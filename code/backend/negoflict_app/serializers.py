from rest_framework import serializers
from .models import Mediator, Address, AddressMediator
from core.serializers import  UserCreateSerializer
from core.models import User





class MediatorSerializer(serializers.ModelSerializer):
    user = UserCreateSerializer()
    class Meta:
        model = Mediator
        fields = ['id','phone','education','relevant_experience','mediation_areas','certification_course','user']
        depth = 1
        
    

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class AddressMediatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddressMediator
        fields = '__all__'
