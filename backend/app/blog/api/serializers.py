from rest_framework import serializers


from blog.models import Post, Category

class PostSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        queryset=Category.objects.all(),
        slug_field='uuid'
        )
    image = serializers.ImageField(max_length=None, use_url=True, required=True)

    class Meta:
        model = Post 
        read_only_fields = ('uuid', 'slug')
        fields = (
            'uuid',
            'title', 
            'slug',
            'image',
            'content', 
            'category', 
        ) 
    def create(self, validated_data):
        print("data", validated_data)
        category = validated_data.pop('category', None)
        print("Category", category.uuid)
        try: 
            category_object = Category.objects.get(uuid=category.uuid)
        except Category.DoesNotExist:
            raise serializers.ValidationError
        post = Post.objects.create(category=category_object, **validated_data)
        return post 

    def update(self, instance, validated_data):
        category = validated_data.pop('category', None)
        print('Validated Data', validated_data)
        print('Category', category)
        print('Instance uuid', instance.uuid)
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.first_name)
        instance.image = validated_data.get('image', instance.image)
        try: 
            category_object = Category.objects.get(uuid=category.uuid)
        except Category.DoesNotExist:
            instance.save() 
        instance.category = category_object or instance.category
        return instance

