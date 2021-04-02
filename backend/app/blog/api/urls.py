from django.urls import path

from blog.api import views 

urlpatterns = [
    path('', views.PostCreateAPIView.as_view(), name='post_create'),
]
