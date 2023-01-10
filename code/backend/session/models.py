from django.db import models
from django.conf import settings
from negoflict_app.models import Mediator


class Case(models.Model):
    FAMALY = 'FA'
    FRIENDS = 'FR'
    NEIGHBORS = 'NE'
    EDUCATION = 'ED'
    ORGANIZATIONS = 'OR'
    BUISINESS = 'BS'
    POLITICS = 'PO'
    OTHER = 'OT'

    CATEGORY_CHOICES = [
        (FAMALY, 'Family'),
        (FRIENDS, 'Friends'),
        (NEIGHBORS, 'Neighbors'),
        (EDUCATION, 'Education'),
        (ORGANIZATIONS, 'Organizations'),
        (BUISINESS, 'Buisiness'),
        (POLITICS, 'Politics'),
        (OTHER, 'Other')
    ]
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=2,choices=CATEGORY_CHOICES,default=OTHER)
    sub_category = models.CharField(max_length=50)
    note = models.CharField(max_length=180)
    mediator = models.ForeignKey(Mediator, on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)
    closed_at = models.DateTimeField(null=True)
    
class GroupChat(models.Model):
    CHAT_WITH_A = 'A'
    CHAT_WITH_B = 'B'
    CHAT_WITH_GROUP = 'G'

    CHAT_CHOICES = [
        (CHAT_WITH_A, 'Chat only with side A'),
        (CHAT_WITH_B, 'Chat only with side B'),
        (CHAT_WITH_GROUP,'Chat with the group')

    ]
    cteate_at = models.DateTimeField(auto_now=True)
    case = models.ForeignKey(Case,on_delete=models.CASCADE)
    chat = models.CharField(max_length=1,choices=CHAT_CHOICES, default=CHAT_WITH_GROUP)


class GroupMember(models.Model):
    SIDE_A = 'A'
    SIDE_B = 'B'
    SIDE_NULL = 'N'

    SIDES_CHOICES = [
        (SIDE_A,'Side A'),
        (SIDE_B,'Side B'),
        (SIDE_NULL,'Null')
    ]
    group_chat = models.ForeignKey(GroupChat,on_delete=models.CASCADE)
    side = models.CharField(max_length=1,choices=SIDES_CHOICES,default=SIDE_NULL)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


class Image(models.Model):
    create_at = models.DateTimeField(auto_now_add=True)
    blob = models.ImageField()


class Message(models.Model):
    group_chat = models.ForeignKey(GroupChat,on_delete=models.CASCADE)
    user = models.ForeignKey(GroupMember, on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True)







