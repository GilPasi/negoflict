from rest_framework.viewsets import ModelViewSet
from .models import Case,GroupChat, GroupMember, Message, Contact, Survey
from negoflict_app import permissions
from .serializers import CaseSerializer, GroupChatSerializer,GroupMemberSerializer, MessageSerial, GroupMemberWithUserSerializer, ContactCreateSerializer, ContactSerializer, SurveySerializer
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
            
            # if i <2:
            #     group_member_serializer = GroupMemberSerializer(data={'side':sides[i],'group_chat':group_instance.id,'case':case.id,'mediator':case.mediator})
            #     group_member_serializer.is_valid(raise_exception=True)
            #     group_member_serializer.save()
            #     member_groups.append(group_member_serializer.data)
                
        data = {'case':case_serializer.data,'chat_groups':chat_groups}
        
        return Response(data,status=201)
    
    @action(detail=False,methods=['GET'],permission_classes=[permissions.IsAdminOrUser])
    def casess_by_mediator(self,request):
        mediator_id = request.GET.get('id',None)
        
        if mediator_id:
            queryset = self.queryset.filter(mediator=mediator_id)
            serializer = CaseSerializer(queryset, many=True)
            return Response(serializer.data, status=200)
        return Response('Not found', status=404)
    
    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAdminOrUser])
    def get_open_close_cases(self,request):
        mediator_id = request.GET.get('id',None)
        open_close = request.GET.get('open_close',None)
        
        missing_parameter =[]
        if not mediator_id:
            missing_parameter.append(('missing parameter id', status.HTTP_400_BAD_REQUEST))
        if not open_close:
            missing_parameter.append(('missing parameter open or close', status.HTTP_400_BAD_REQUEST))
        if len(missing_parameter) > 0:
            return Response(missing_parameter, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = self.queryset.filter(mediator=mediator_id).filter(is_active=open_close)
        serializer = CaseSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
           
        
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
    
    
    @action(detail=False, methods=[ 'PUT' ], permission_classes=[permissions.IsAdminOrUser])
    def change_groupSide(self,request):
        user_id = request.GET.get('user',None)
        side = request.GET.get('side',None)
        
        if not user_id:
            return Response('missing parameter user', status=status.HTTP_400_BAD_REQUEST)
        if not side:
            return Response('missing parameter side', status=status.HTTP_400_BAD_REQUEST)
        
        member = self.queryset.get(user=user_id)
        if not member:
            return Response('not found', status=status.HTTP_404_NOT_FOUND)
        member.side = side
        try:
            serializer = GroupMemberSerializer(member, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
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
    
    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAdminOrUser])
    def get_open_close_case_by_user(self, request):
        id = request.GET.get('id',None)
        open_close = request.GET.get('open_close',None)
        
        missing_parameter = []
        
        if not id:
             missing_parameter.append(('missing parameter id', status.HTTP_400_BAD_REQUEST))
        if not open_close:
             missing_parameter.append(('missing parameter open or close', status.HTTP_400_BAD_REQUEST))
        
        if len(missing_parameter) > 0:
            return Response(missing_parameter, status=status.HTTP_400_BAD_REQUEST)
        
        members = self.queryset.filter(user=id).filter(is_active=True)
        cases = []
        
        for member in members:
            caseId = member.case_id
            queryset = Case.objects.filter(pk=caseId).filter(is_active=open_close)
            cases.extend(queryset)
            
        serializer = CaseSerializer(cases, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['POST'],permission_classes=[permissions.IsAdminOrUser])
    def register_many_users(self, request):
        data = request.data
        
        if isinstance(data, list):
            serializer = self.get_serializer(data=data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response('Bad request',status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAdminOrUser])
    def get_users_by_case(self, request):
        case = request.GET.get('case',None)
        
        if case:
            queryset = self.queryset.filter(case=case, is_active=True)
            if queryset:
                serializer = GroupMemberSerializer(queryset, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response('cant find case', status=status.HTTP_404_NOT_FOUND)
        return Response('missing parameter case', status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAdminOrUser])
    def get_full_users_by_case(self,request):
        case = request.GET.get('case',None)
        
        if case:
            queryset = self.queryset.filter(case=case,is_active=True)
            if queryset:
                serializer = GroupMemberWithUserSerializer(queryset, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response('cant find case', status=status.HTTP_404_NOT_FOUND)
        return Response('missing parameter case', status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['PUT'], permission_classes=[permissions.IsAdminOrUser])
    def set_active_member(self, request):
        case = request.GET.get('case', None)
        user_id = request.GET.get('user_id', None)
        status_value = request.GET.get('status', None)
        
        
        missing_parameter = []

        if not case:
            missing_parameter.append(('missing parameter case', status.HTTP_400_BAD_REQUEST))
        if not user_id:
            missing_parameter.append(('missing parameter user id', status.HTTP_400_BAD_REQUEST))

        if len(missing_parameter) > 0:
            return Response(missing_parameter, status=status.HTTP_400_BAD_REQUEST)

        try:
            member = self.queryset.get(user=user_id, case=case)
        except self.queryset.model.DoesNotExist:
            return Response('member not found', status=status.HTTP_400_BAD_REQUEST)

        member.is_active = status_value
        serializer = self.get_serializer(member, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
        
        
        
class MessageView(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerial
    permission_classes = [permissions.IsAdminOrUser]
    
    
class ContactView(ModelViewSet):
    queryset = Contact.objects.select_related('user').all()
    serializer_class = ContactCreateSerializer
    permission_classes = [permissions.IsAdminOrUser]
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ContactSerializer
        return super().get_serializer_class()
    
    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAdminOrUser])
    def get_contact_by_mediator(self, request):
        mediator_id = request.GET.get('mediator',None)
        
        if mediator_id:
            contacts = self.queryset.filter(mediator=mediator_id)
            if contacts:
                serializer = ContactSerializer(contacts,many=True)
                return Response(serializer.data,status=status.HTTP_200_OK)
            return Response('no contacts', status=status.HTTP_404_NOT_FOUND)
        return Response('Bad request',status=status.HTTP_400_BAD_REQUEST)
   
   
    
    
    
    
class SurveyView(ModelViewSet):
    queryset = Survey.objects.all()
    serializer_class= SurveySerializer
    permission_classes= [permissions.All]
    
    # def get_permissions(self):
    #     if self.request.method == 'POST' and self.request.user.is_authenticated:
    #         return permissions.IsAdminOrUser
    #     return super().get_permissions()
        
        
        
        
    
    
    
    
    
    
    
            


