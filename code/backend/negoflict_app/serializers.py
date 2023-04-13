from rest_framework import serializers
from .models import Mediator, Address, AddressMediator
from core.serializers import  UserCreateSerializer
from core.models import User
from .models import category


class MediationChoiceField(serializers.Field):
    def to_representation(self, value):
        mediation_dict = dict(category.MEDIATION_CHOICES)
        return mediation_dict.get(value, value)

    def to_internal_value(self, data):
        for key, value in category.MEDIATION_CHOICES:
            if value == data:
                return key
        raise serializers.ValidationError("Invalid mediation area value.")





class MediatorSerializer(serializers.ModelSerializer):
    user = UserCreateSerializer()
    mediation_areas = MediationChoiceField()

    class Meta:
        model = Mediator
        fields = ['phone','education','relevant_experience','mediation_areas','certification_course','user']
        depth = 1
        

    

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class AddressMediatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddressMediator
        fields = '__all__'
