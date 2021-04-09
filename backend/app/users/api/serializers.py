from rest_framework import serializers
from dj_rest_auth.serializers import UserDetailsSerializer

class CustomUserDetailsSerializer(UserDetailsSerializer):
    """ Used in settings for dj_rest_auth, includes auth_uuid in response"""

    class Meta(UserDetailsSerializer.Meta):
            print("UserDetailFields", UserDetailsSerializer.Meta.fields)
            fields = ('email','uuid',)
            read_only_fields = ('uuid',)