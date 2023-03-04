from rest_framework.viewsets import ModelViewSet
from .models import Case
from negoflict_app import permissions
from .serializers import CaseSerializer




class CaseView(ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer




