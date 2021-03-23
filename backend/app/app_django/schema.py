import graphene
from graphene_django import DjangoObjectType

from blog.models import Category, Post

class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = ("uuid", "name", "slug", "posts")

class PostType(DjangoObjectType):
    class Meta:
        model = Post 
        fields = ("uuid", "title", "slug", "content", "category")

class Query(graphene.ObjectType):
    all_posts = graphene.List(
        PostType
    )
    post_by_slug = graphene.Field(
        PostType,
        slug=graphene.String(required=True)
    )
    all_categories = graphene.List(
        CategoryType
    )
    category_by_slug = graphene.Field(
        CategoryType,
        slug=graphene.String(required=True)
    )
    """ Post resolvers """
    def resolve_all_posts(root, info):
        return Post.objects.select_related("category").all()

    def resolve_post_by_slug(root, info, slug):
        try:
            return Post.objects.get(slug=slug)
        except Post.DoesNotExist:
            return None

    """ Category resolvers """
    def resolve_all_categories(root, info):
        return Category.objects.all()

    def resolve_category_by_slug(root, info, slug):
        try:
            return Category.objects.get(slug=slug)
        except Category.DoesNotExist:
            return None

schema = graphene.Schema(query=Query)