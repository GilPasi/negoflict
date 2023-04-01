from django.db import models
from django.conf import settings
from negoflict_app.models import Mediator
from negoflict_app.models import category
import uuid


class Case(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    create_at =models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=150)
    mediator = models.ForeignKey(Mediator,on_delete=models.SET_NULL, null=True, related_name='+')
    category = models.CharField(max_length=2, choices=category.MEDIATION_CHOICES, default=category.OTHER)
    sub_category = models.CharField(max_length=50)
    problem_brief = models.CharField(max_length=150,null=True)
    close_at = models.DateTimeField(null=True, blank=True)
    summary = models.TextField(null=True)
    is_active = models.BooleanField(null=True,blank=True)
    

    

    
    
class GroupChat(models.Model): #define the group side of the conflict and where message is send to
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


class GroupMember(models.Model): #define the user side in the conflict
    SIDE_A = 'A'
    SIDE_B = 'B'
    SIDE_NULL = 'G'

    SIDES_CHOICES = [
        (SIDE_A,'Side A'),
        (SIDE_B,'Side B'),
        (SIDE_NULL,'Null')
    ]
    group_chat = models.ForeignKey(GroupChat,on_delete=models.CASCADE)
    side = models.CharField(max_length=1,choices=SIDES_CHOICES,default=SIDE_NULL)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True,null=True)
    case = models.ForeignKey(Case,on_delete=models.CASCADE)
    mediator = models.ForeignKey(Mediator,on_delete=models.CASCADE)



class Message(models.Model):
    group_chat = models.ForeignKey(GroupChat,on_delete=models.CASCADE)
    user = models.ForeignKey(GroupMember, on_delete=models.CASCADE, null=True, blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    date_time = models.DateTimeField( null=True)
    time_left_last_message = models.DecimalField(decimal_places=2,max_digits=10)
    num_of_chars = models.IntegerField()
    text = models.TextField()

    
     
   

   
class Survey(models.Model):
    GREAT_SUCCESS = 'GS'
    SUCCESS = 'S'
    PARTIAL_SUCCESS = 'PS'
    WITHOUT_SUCCESS = 'WS'
    FAILURE = 'F'
    
    VALUES_CHOICESS = [
        (GREAT_SUCCESS,'GREAT_SUCCESS'),
        (SUCCESS,'SUCCESS'),
        (PARTIAL_SUCCESS,'PARTIAL_SUCCESS'),
        (WITHOUT_SUCCESS,'WITHOUT_SUCCESS'),
        (FAILURE,'FAILURE')
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True)
    case = models.ForeignKey(Case,on_delete=models.CASCADE, null=True)
    note = models.CharField(max_length=180, null=True)
    case_rate = models.CharField(max_length=2,choices=VALUES_CHOICESS,default='', null=True)
    
    

