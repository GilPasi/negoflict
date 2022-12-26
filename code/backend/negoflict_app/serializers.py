from rest_framework import serializers
from .models import Mediator, Address, AddressMediator


class MediatorSerializer(serializers.ModelSerializer):
    mediator_user = serializers.IntegerField(read_only=True)
    class Meta:
        model = Mediator
        fields = ['id','mediator_user','phone','education','relevant_experience','mediation_areas','certification_course']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class AddressMediatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddressMediator
        fields = '__all__'
