from rest_framework import generics
from rest_framework.generics import get_object_or_404 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import (
    IsAuthenticated, AllowAny
)

from blog.models import Post, Category 
from blog.api.serializers import (
    PostSerializer,
)


class PostUpdateAPIView(APIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # Need to change for when auth implemented 
    permission_classes = (IsAuthenticated)

    def get_object(self, slug):
        post = get_object_or_404(Post, slug=slug)
        return post 

    def put(self,request, slug):
        post = self.get_object(slug)
        serializer = PostSerializer(post, data=request.data)
    
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
            )
        else:
            return Response(
                serializer.error_messages,
                status=status.HTTP_400_BAD_REQUEST
            )


class PostCreateAPIView(APIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        print("Request", request.data)
        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
            )
        else:
            return Response(
                serializer.error_messages,
                status=status.HTTP_400_BAD_REQUEST
            )
    """
    def put(self,request, uuid):
        user = self.get_object(uuid)
        serializer = CustomUserSerializer(user, data=request.data)
    
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
            )
        else:
            return Response(
                serializer.error_messages,
                status=status.HTTP_400_BAD_REQUEST
            )
    """
