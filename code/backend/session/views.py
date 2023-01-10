from rest_framework.viewsets import ModelViewSet
from .models import Case
from negoflict_app import permissions




class CaseView(ModelViewSet):
    queryset = Case.objects.all()
    # permission_classes = [permissions.IsStaff]




