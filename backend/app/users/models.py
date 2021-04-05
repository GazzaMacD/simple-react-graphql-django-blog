import uuid

from django.conf import settings
from django.db import models
from authtools.models import AbstractEmailUser
from django.utils.translation import gettext_lazy as _

from core.models import TimeStampedModel

class User(AbstractEmailUser):
    uuid = models.UUIDField(
        _("UUID"),
        null=False,
        blank=False,
        default=uuid.uuid4,
        editable=False,
        help_text=_(
            "Auto generated and unique"
        )
    )

class BasePartner(models.Model):
    """ Base fields common to all partners. Extend role choices as needed and add
    a coresponding abstract class to encapsulate all fields. As abstract and will be
    auto created with signal all fields must be either null=True (except for the field
    types that Django sets to a string for empty such as CharField etc,)  blank=True or 
    have a default value. Differentation of functionality based on roles must 
    be dealt with in the frontend, dashboard, model methods or model managers"""
    # Role Choices
    REGULAR = 1
    ROLE_CHOICES = (
        (REGULAR, _("Regular")),
        #add more roles here as needed
    )
    # fields
    user =  models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    uuid = models.UUIDField(
        _("UUID"),
        null=False,
        blank=False,
        default=uuid.uuid4,
        editable=False,
        help_text=_(
            "Auto generated and unique"
        )
    )
    role = models.IntegerField(
        _("Role"),
        null=False,
        blank=False,
        choices=ROLE_CHOICES,
        default=REGULAR,
        help_text=_(
            "Default is regular"
        )
    )
    name = models.CharField(
        _("Name"),
        null=False,
        blank=True,
        max_length=255
    )

    def __str__(self):
        return str(self.uuid)

    class Meta:
        abstract = True


class Partner(BasePartner, TimeStampedModel):
    """Use multiple inheritance here to gather all abstract models 
    into Partner Model"""
    pass