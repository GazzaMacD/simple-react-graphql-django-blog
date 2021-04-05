from django.contrib import admin
from authtools.admin import UserAdmin

# Register your models here.
from users.models import User

admin.site.register(User, UserAdmin)