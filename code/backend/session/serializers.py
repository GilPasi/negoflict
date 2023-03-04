from rest_framework import serializers
from .models import Case,GroupChat,GroupMember,Message, Survey


class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = ['id','create_at','title','mediator','category','sub_category','problem_brief','close_at','summary']
        
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
        