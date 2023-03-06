from rest_framework.viewsets import ModelViewSet
from .models import Case, AgoraUser
from negoflict_app import permissions
from .serializers import CaseSerializer, AgoraUserSerializer




class CaseView(ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    
    
class AgoraUserView(ModelViewSet):
    queryset = AgoraUser.objects.select_related('case','user').all()
    serializer_class = AgoraUserSerializer
    




