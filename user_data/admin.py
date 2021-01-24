from django.contrib import admin
from .models import UserData

# Register your models here.

class UserDataAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'body')
    raw_id_fields = ('user',)

admin.site.register(UserData, UserDataAdmin)