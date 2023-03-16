from rest_framework.viewsets import ModelViewSet
from .models import Case, AgoraUser
from negoflict_app import permissions
from .serializers import CaseSerializer, AgoraUserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response



class CaseView(ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes= [permissions.All]
    
    @action(detail=False,methods=['GET'],permission_classes=[permissions.All])
    def casess_by_mediator(self,request):
        mediator_id = request.GET.get('id',None)
        print('im innnnndsfajsghfiauerhgivsrthgibhsrtihgisrthgshfdghsiruhgiuhennnnnnnnnbbbbbbbbbb')
        print (mediator_id)
        if mediator_id:
            queryset = self.queryset.filter(mediator=mediator_id)
            print('in casesssssssssssss')
            print(queryset)
            serializer = CaseSerializer(queryset, many=True)
            return Response(serializer.data, status=200)
        return Response('Not found', status=404)
            
            
    
    
class AgoraUserView(ModelViewSet):
    queryset = AgoraUser.objects.select_related('case','user').all()
    serializer_class = AgoraUserSerializer
    




