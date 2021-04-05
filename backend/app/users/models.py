import uuid

from django.db import models
from authtools.models import AbstractEmailUser
from django.utils.translation import gettext_lazy as _

class User(AbstractEmailUser):
    uuid = models.UUIDField(
        _("UUID"),
        null=False,
        blank=False,
        default=uuid.uuid4,
        editable=False,
        help_text=_(
            "Auto Generated and unique"
        )
    )

