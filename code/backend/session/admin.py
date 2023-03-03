from django.contrib import admin
from . import models

@admin.register(models.Case)
class CaseAdmin(admin.ModelAdmin):
    list_display = []
    list_select_related = ['user']


@admin.register(models.GroupChat)
class GroupChatAdmin(admin.ModelAdmin):
    list_display = []
    list_select_related = ['case']

    def case(self,case):
        return case.name

@admin.register(models.GroupMember)
class GroupMember(admin.ModelAdmin):
    list_display = []
    list_select_related = ['user']


@admin.register(models.Message)
class GroupMember(admin.ModelAdmin):
    list_display = []
    list_select_related = ['user']









