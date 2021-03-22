from django.db import models
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    name = models.CharField(
        _("Name"),
        max_length=100,
        help_text=_("If you delete a category you will delete all the blog posts associated with this category. TAKE CARE")
    )

    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField(
        _("Title"),
        max_length=100
        )
    content = models.TextField(
        _("Content"),
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="posts", 
    )

    def __str__(self):
        return self.title
