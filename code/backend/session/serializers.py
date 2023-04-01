from rest_framework import serializers
from .models import Case,GroupChat,GroupMember,Message, Survey,category


class MediationChoiceField(serializers.Field):
    def to_representation(self, value):
        mediation_dict = dict(category.MEDIATION_CHOICES)
        return mediation_dict.get(value, value)

    def to_internal_value(self, data):
        for key, value in category.MEDIATION_CHOICES:
            if value == data:
                return key
        raise serializers.ValidationError("Invalid mediation area value.")


class CaseSerializer(serializers.ModelSerializer):
    category = MediationChoiceField()
    class Meta:
        model = Case
        fields = ['id','create_at','title','mediator','category','sub_category','problem_brief','close_at','summary','is_active']
        
class GroupChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupChat
        fields = '__all__'
        
        
class GroupMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMember
        fields = '__all__'
        

        
class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = '__all__'
        
        
        
        
class MessageSerial(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
        
        