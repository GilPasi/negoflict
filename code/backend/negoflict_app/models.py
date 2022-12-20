from django.db import models
from django.conf import settings

class Mediator(models.Model):
    FAMALY = 'FA'
    FRIENDS = 'FR'
    NEIGHBORS = 'NE'
    EDUCATION = 'ED'
    ORGANIZATIONS = 'OR'
    BUISINESS = 'BS'
    POLITICS = 'PO'
    OTHER = 'OT'

    MEDIATION_CHOICES = [
        (FAMALY, 'Family'),
        (FRIENDS, 'Friends'),
        (NEIGHBORS, 'Neighbors'),
        (EDUCATION, 'Education'),
        (ORGANIZATIONS, 'Organizations'),
        (BUISINESS, 'Buisiness'),
        (POLITICS, 'Politics'),
        (OTHER, 'Other')
    ]
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    phone = models.CharField(max_length=50)
    education = models.CharField(max_length=255)
    relevant_experience = models.TextField()
    mediation_areas = models.CharField(max_length=2, choices=MEDIATION_CHOICES, default=OTHER)
    certification_course = models.BooleanField(default=False)

    

    
class Address(models.Model):
    city = models.CharField(max_length=150)
    street = models.CharField(max_length=150)
    zip = models.CharField(max_length=20)


class AddressMediator(models.Model):
    mediator = models.ForeignKey(Mediator,on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)

class client(models.Model):
    user= models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

