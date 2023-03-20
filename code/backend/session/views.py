from rest_framework.viewsets import ModelViewSet
from .models import Case, AgoraUser,GroupChat, GroupMember
from negoflict_app import permissions
from .serializers import CaseSerializer, AgoraUserSerializer, GroupChatSerializer,GroupMemberSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from core.models import User
from rest_framework import status



class CaseView(ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes= [permissions.IsAdminOrUser]
    
    
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
    
    
            
            
    
    
class AgoraUserView(ModelViewSet):
    queryset = AgoraUser.objects.select_related('case','user').all()
    serializer_class = AgoraUserSerializer
    
    
    
class GroupChatView(ModelViewSet):
    queryset = GroupChat.objects.all()
    serializer_class = GroupChatSerializer
    permission_classes = [permissions.IsAdminOrUser]
    
    
    
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


