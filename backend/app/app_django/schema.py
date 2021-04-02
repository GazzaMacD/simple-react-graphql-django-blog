import graphene
from graphene_django import DjangoObjectType
from graphene_file_upload.scalars import Upload

from blog.models import Category, Post

"""
Types with DjangoObjectTypes
"""
class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = ("uuid", "name", "slug", "posts")

class PostType(DjangoObjectType):
    class Meta:
        model = Post 
        fields = ("uuid", "title", "slug", "content", "category", "image")

    def resolve_image(self, info):
        if self.image:
            return self.image.url
        else: 
            return ""


"""
Queries
"""

class Query(graphene.ObjectType):
    all_posts = graphene.List(
        PostType
    )
    post_by_uuid = graphene.Field(
        PostType,
        uuid=graphene.String(required=True)
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
    category_by_uuid = graphene.Field(
        CategoryType,
        uuid=graphene.String(required=True)
    )
    # Post query resolvers ==================
    def resolve_all_posts(root, info):
        return Post.objects.select_related("category").all()

    def resolve_post_by_uuid(root, info, **kwargs):
        uuid = kwargs.get("uuid")
        try:
            return Post.objects.get(uuid=uuid)
        except Post.DoesNotExist:
            return None 

    def resolve_post_by_slug(root, info, **kwargs):
        slug = kwargs.get("slug")
        try:
            return Post.objects.get(slug=slug)
        except Post.DoesNotExist:
            return None

    def resolve_post_by_slug(root, info, **kwargs):
        slug = kwargs.get("slug")
        print(f"info is {info.context}")
        try:
            return Post.objects.get(slug=slug)
        except Post.DoesNotExist:
            return None

    # Category query resolvers ==================
    def resolve_all_categories(root, info):
        return Category.objects.all()

    def resolve_category_by_slug(root, info, **kwargs):
        slug = kwargs.get("slug")
        try:
            return Category.objects.get(slug=slug)
        except Category.DoesNotExist:
            return None
    def resolve_category_by_uuid(root, info, **kwargs):
        uuid = kwargs.get("uuid")
        try:
            return Category.objects.get(uuid=uuid)
        except Category.DoesNotExist:
            return None

"""
Mutations
"""
# Post mutations ==================
class UpdatePost(graphene.Mutation):
    class Arguments:
        slug = graphene.String(required=True)
        title = graphene.String()
        content = graphene.String()
        category_uuid = graphene.String()

    updated_post = graphene.Field(PostType)

    def mutate(self, info, slug, title=None, content=None, category_uuid=None):
        category_object = None
        if category_uuid:
            try: 
                category_object = Category.objects.get(uuid=category_uuid)
            except Category.DoesNotExist:
                return "Category does not exist"
        try:
            post_to_update = Post.objects.get(slug=slug)
        except Post.DoesNotExist: 
            return None
        # update values
        post_to_update.title = title or post_to_update.title
        post_to_update.content = content or post_to_update.content
        post_to_update.category = category_object or post_to_update.category
        #save the updated post
        post_to_update.save()

        # Return an instance of the mutation
        return UpdatePost(
            updated_post=post_to_update
        )


class CreatePost(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        content = graphene.String(required=True)
        category_uuid = graphene.String(required=True)

    #returned
    post = graphene.Field(PostType)

    def mutate(self, info, title, content, category_uuid):
        print("info", info)
        category_object = Category.objects.get(uuid=category_uuid)
        created_post = Post.objects.create(
                title=title,
                content=content,
                category=category_object
            )
        # Return an instance of the mutation
        return CreatePost(
            post=created_post
        )

class DeletePost(graphene.Mutation):
    class Arguments:
        slug = graphene.String(required=True)

    #returned
    ok = graphene.Boolean()


    def mutate(self, info, slug):
        try:
            post_to_delete = Post.objects.get(slug=slug)
        except Post.DoesNotExist: 
            return DeletePost(
                ok=False
            )
        #  delete object 
        post_to_delete.delete()
        return DeletePost(
            ok=True
        )

# Category mutations ==================
class Mutation(graphene.ObjectType):
    create_post = CreatePost.Field()
    update_post = UpdatePost.Field()
    delete_post = DeletePost.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)