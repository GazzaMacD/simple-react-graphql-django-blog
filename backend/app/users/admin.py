from django.contrib import admin
from authtools.admin import UserAdmin

from django.utils.translation import gettext_lazy as _

# Register your models here.
from users.models import User, Partner

class PartnerInline(admin.StackedInline):
    model = Partner
    can_delete = False
    verbose_name_plural = _("User Profile ")
    fk_name = 'user'

class CustomUserAdmin(UserAdmin):
    inlines = (PartnerInline,)

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)


admin.site.register(User, CustomUserAdmin)

