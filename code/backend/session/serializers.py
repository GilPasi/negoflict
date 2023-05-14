from rest_framework import serializers
from .models import Case,GroupChat,GroupMember,Message, Survey,category,Contact, surveyCategory
from core.serializers import UserSerializer
from core.serializers import  UserCreateSerializer


class MediationChoiceField(serializers.Field):
    def to_representation(self, value):
        mediation_dict = dict(category.MEDIATION_CHOICES)
        return mediation_dict.get(value, value)

    def to_internal_value(self, data):
        for key, value in category.MEDIATION_CHOICES:
            if value == data:
                return key
        raise serializers.ValidationError("Invalid mediation area value.")
    
    
class SurveyChoiceField(serializers.Field):
    def to_representation(self, value):
        survey_dict = dict(surveyCategory.VALUES_CHOICESS)
        return survey_dict.get(value, value)

    def to_internal_value(self, data):
        for key, value in surveyCategory.VALUES_CHOICESS:
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
        fields = ['id','side','group_chat','user','case','mediator', 'is_active']
        

class GroupMemberWithUserSerializer(serializers.ModelSerializer):
    user = UserCreateSerializer()
    
    class Meta:
        model = GroupMember
        fields = ['id','side','group_chat','user','case','mediator']
    
        

        
class SurveySerializer(serializers.ModelSerializer):
    case_rate = SurveyChoiceField()
    class Meta:
        model = Survey
        fields = ['user','case','note','case_rate']
        
        
        
        
class MessageSerial(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
        
class GroupMemberWithUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = GroupMember
        fields = ['id','side','group_chat','user','case','mediator']
    
        
class ContactSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Contact
        fields = ['user','mediator']
        
class ContactCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['user','mediator']
        