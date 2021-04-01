import uuid

from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    # uuid field for public facing id work, 
    # keep auto generated id for indexing and internal work
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
    name = models.CharField(
        _("Name"),
        null=False,
        blank=False,
        max_length=100,
        help_text=_("If you delete a category you will delete all the blog posts associated with this category. TAKE CARE")
    )
    slug = models.SlugField(
        null=False,
        blank=False,
        unique=True,
        max_length=200,
        editable=False,
        help_text=_(
            "Auto generated and unique"
        )
    )

    def __str__(self):
        return self.name

    def _get_unique_slug(self):
        slug = slugify(self.name)
        unique_slug = slug
        # Case for new Category object
        if not Category.objects.filter(slug=unique_slug).exists():
            return unique_slug
        else:
            # Case for update on a Post object
            if Category.objects.filter(
                    slug=unique_slug)[0].id == self.id:
                return unique_slug
            # Case for where title is not unique so create numbered 
            # unique slug 
            else:
                num = 1
                while Category.objects.filter(
                        slug=unique_slug).exists():
                    unique_slug = slug
                    unique_slug = f"{unique_slug}-{num}"
                    num += 1
                return unique_slug

    def clean(self, *args, **kwargs):
        self.slug = self._get_unique_slug()

    def save(self, *args, **kwargs):
        # will be called twice (calls clean above) but only once
        # if not using django form classes
        self.full_clean()
        super().save(*args, **kwargs)


class Post(models.Model):
    # uuid field for public facing id work, 
    # keep auto generated id for indexing and internal work
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
    title = models.CharField(
        _("Title"),
        null=False,
        blank=False,
        max_length=100
        )
    slug = models.SlugField(
        null=False,
        blank=False,
        unique=True,
        max_length=200,
        editable=False,
        help_text=_(
            "Auto generated and unique"
        )
    )
    image = models.ImageField(
        upload_to="blog/",
        null=False,
        blank=True
    )
    content = models.TextField(
        _("Content"),
        null=False,
        blank=False,
        help_text=_(
            "If you delete a category you will delete all the blog posts associated with this category. TAKE CARE")
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="posts", 
        null=False,
        blank=False
    )

    def __str__(self):
        return self.title

    def _get_unique_slug(self):
        slug = slugify(self.title)
        unique_slug = slug
        # Case for new Post object
        if not Post.objects.filter(slug=unique_slug).exists():
            return unique_slug
        else:
            # Case for update on a Post object
            if Post.objects.filter(
                    slug=unique_slug)[0].id == self.id:
                return unique_slug
            # Case for where title is not unique so create numbered 
            # unique slug 
            else:
                num = 1
                while Post.objects.filter(
                        slug=unique_slug).exists():
                    unique_slug = slug
                    unique_slug = f"{unique_slug}-{num}"
                    num += 1
                return unique_slug

    def clean(self, *args, **kwargs):
        self.slug = self._get_unique_slug()

    def save(self, *args, **kwargs):
        # will be called twice (calls clean above) but only once
        # if not using django form classes
        self.full_clean()
        super().save(*args, **kwargs)