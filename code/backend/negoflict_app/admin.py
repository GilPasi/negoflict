from django.contrib import admin
from . import models

@admin.register(models.Mediator)
class MediatorAdmin(admin.ModelAdmin):
    list_display = ['username','phone', 'address']
    list_select_related = ['user']
 

    def username(self, mediator):
        return mediator.user.username

    def address(self,mediator):
        address = models.AddressMediator.objects.get(mediator = mediator)
        return address.address.__str1__()
    

        
@admin.register(models.Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['city', 'street','zip']
    
@admin.register(models.AddressMediator)
class AddressMediatorAdmin(admin.ModelAdmin):
    list_display = ['mediator','address']
    list_select_related = ['mediator','address']







