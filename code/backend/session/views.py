from rest_framework.viewsets import ModelViewSet
from .models import Case,GroupChat, GroupMember, Message
from negoflict_app import permissions
from .serializers import CaseSerializer, GroupChatSerializer,GroupMemberSerializer, MessageSerial, GroupMemberWithUserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from core.models import User
from rest_framework import status



class CaseView(ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes= [permissions.IsAdminOrUser]
    
    @action(detail=False, methods=['DELETE'], permission_classes=[permissions.All]) #change that permission
    def delete_case(self,request):
        id = request.GET.get('caseId')
        
        if id:
            instance =self.queryset.get(pk=id)
            if instance:
                self.perform_destroy(instance)
                return Response('object deleted',status=status.HTTP_200_OK)
            return Response('Not found',status=status.HTTP_404_NOT_FOUND)
        return Response('missing caseId',status=status.HTTP_400_BAD_REQUEST)
        
        
    
    
    @action(detail=False, methods=['POST','GET'], permission_classes=[permissions.IsAdminOrUser])
    def create_case_and_groups(self,request):
        data = request.data
        case_serializer = CaseSerializer(data=data)
        case_serializer.is_valid(raise_exception=True)
        case =case_serializer.save()
        
        chat_groups = []
        member_groups =[]
        
        for i in range(3):
            sides = ['A','B','G']
            group_chat_serializer = GroupChatSerializer(data={'case':case.id,'chat':sides[i]})
            group_chat_serializer.is_valid(raise_exception=True)
            group_instance = group_chat_serializer.save()
            chat_groups.append(group_chat_serializer.data)
            
            if i <2:
                group_member_serializer = GroupMemberSerializer(data={'side':sides[i],'group_chat':group_instance.id,'case':case.id,'mediator':case.mediator})
                group_member_serializer.is_valid(raise_exception=True)
                group_member_serializer.save()
                member_groups.append(group_member_serializer.data)
                
        data = {'case':case_serializer.data,'chat_groups':chat_groups,'members_groups':member_groups}
        
        return Response(data,status=201)
    
    @action(detail=False,methods=['GET'],permission_classes=[permissions.IsAdminOrUser])
    def casess_by_mediator(self,request):
        mediator_id = request.GET.get('id',None)
        print (mediator_id)
        if mediator_id:
            queryset = self.queryset.filter(mediator=mediator_id)
            serializer = CaseSerializer(queryset, many=True)
            return Response(serializer.data, status=200)
        return Response('Not found', status=404)
    
    
            
            
  
    
    
class GroupChatView(ModelViewSet):
    queryset = GroupChat.objects.all()
    serializer_class = GroupChatSerializer
    permission_classes = [permissions.IsAdminOrUser]
    
    
    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAdminOrUser])
    def get_group_chat_by_case_and_side_chat(self,request):
        case = request.GET.get('case')
        chat = request.GET.get('chat')
        
        if case and chat:
            groupChat = self.queryset.get(case=case, chat=chat)
            if groupChat:
                serializer = GroupChatSerializer(groupChat)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response('not found', status=status.HTTP_404_NOT_FOUND)
        return Response('bad request',status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False,methods=['GET'],permission_classes=[permissions.IsAdminOrUser])
    def get_chat_groups_by_case(self,request):
        case = request.GET.get('case')
        
        if case:
            groupChat = self.queryset.filter(case=case)
            if groupChat.exists():
                serializer = GroupChatSerializer(groupChat, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response('not found', status=status.HTTP_404_NOT_FOUND)
        return Response('bad request', status=status.HTTP_400_BAD_REQUEST)
           
            
    
    
    
class GroupMemberView(ModelViewSet):
    queryset = GroupMember.objects.all()
    serializer_class = GroupMemberSerializer
    permission_classes = [permissions.IsAdminOrUser]
    
    @action(detail=False, methods=['GET', 'PUT', 'DELETE'], permission_classes=[permissions.IsAdminOrUser])
    def get_group_member_by_user(self, request):
        case = request.GET.get('case', None)
        side = request.GET.get('side', None)

        if case and side:
            try:
                member = self.queryset.select_related('group_chat').get(case=case, side=side)

                if self.request.method == 'PUT':
                    user_id = request.data.get('user')
                    if user_id:
                        user = User.objects.get(id=user_id)
                        member.user = user
                    serializer = GroupMemberSerializer(member, data=request.data, partial=True)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)

                elif self.request.method == 'GET':
                    serializer = GroupMemberSerializer(member)
                    return Response(serializer.data, status=status.HTTP_200_OK)

            except GroupMember.DoesNotExist:
                return Response('not found', status=status.HTTP_404_NOT_FOUND)

        return Response('bad request', status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAdminOrUser])
    def get_side_by_id(self, request):
        case = request.GET.get('case')
        user_id = request.GET.get('user')
        
        if case and id:
            try:
                member = self.queryset.select_related('group_chat').get(case=case, user=user_id)
                serializer = GroupMemberSerializer(member)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except GroupMember.DoesNotExist:
                  return Response('not found', status=status.HTTP_404_NOT_FOUND)
        return Response('bad request', status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAdminOrUser])
    def get_mediator_client(self,request):
        mediator_id = request.GET.get('mediator')
        
        if mediator_id:
            users = self.queryset.select_related('user').filter(mediator=mediator_id)
            if users:
                serializer = GroupMemberWithUserSerializer(users, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response('no users for this mediator', status=status.HTTP_404_NOT_FOUND)
        return Response('Bad request', status=status.HTTP_400_BAD_REQUEST)
    
    
    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAdminOrUser])
    def get_case_by_user(self,request):
        id = request.GET.get('id',None)
        
        if id:
            member = self.queryset.get(user=id)
            caseId = member.case_id
            queryset = Case.objects.filter(pk=caseId)
            serializer = CaseSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response('Not found',status=status.HTTP_404_NOT_FOUND)
    
    
class MessageView(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerial
    # permission_classes = [permissions.IsAdminOrUser]
    
    
    
            


