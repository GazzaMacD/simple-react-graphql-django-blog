from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings

from users.models import Partner

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_partner(sender, instance, created, **kwargs):
    """creates partner associated user on creation of user"""
    if created:
        Partner.objects.create(user=instance)
