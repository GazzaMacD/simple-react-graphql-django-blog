from django.contrib import admin
from .models import Post, Category 

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    readonly_fields = ('slug', 'uuid',)
    fieldsets = (
        (
            "Post Details", {
            "description": (
                "Create blog posts here"
            ),
            "fields": (
                "title",
                ("slug", "uuid"),
                "image",
                "content",
                "category"
                ),
            }
        ),
    )# end of fieldset

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    readonly_fields = ('slug', 'uuid',)
    fieldsets = (
        (
            "Category Details", {
            "description": (
                "Create blog categories here"
            ),
            "fields": (
                "name",
                ("slug", "uuid")
                ),
            }
        ),
    )# end of fieldset