from django.db import models
from django.conf import settings

class category():
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
        (BUISINESS, 'Business'),
        (POLITICS, 'Politics'),
        (OTHER, 'Other')
    ]


class Mediator(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
    phone = models.CharField(max_length=50)
    education = models.CharField(max_length=255)
    relevant_experience = models.TextField()
    mediation_areas = models.CharField(max_length=2, choices=category.MEDIATION_CHOICES, default=category.OTHER)
    certification_course = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.user.username

    class Meta:
        ordering = ['user__username']

   
class Address(models.Model):
    city = models.CharField(max_length=150)
    street = models.CharField(max_length=150, null=True, blank=True)
    zip = models.CharField(max_length=20, null=True, blank=True)
    
    

    def __str1__(self) -> str:
        return f'{self.city} / { self.street} / {self.zip}'

    def __str__(self) -> str:
        return self.city
    
    # class Meta:
    #     unique_together = ('city', 'street')

 


class AddressMediator(models.Model):
    mediator = models.ForeignKey(Mediator,on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    
  

    
    
    




    
    
    
        
    
 

    
    


