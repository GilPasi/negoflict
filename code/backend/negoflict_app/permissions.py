from rest_framework.permissions import  BasePermission
from rest_framework import permissions


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.is_superuser:
            return True

class IsAdminOrUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_staff)


class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user.is_staff)
    
    

