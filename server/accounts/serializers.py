from rest_framework import serializers
from .models import Follow, Like, User, Wish


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ('id', 'nickname', 'email', 'password', 'address', 'spoon_cnt', 'grade')


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ('id', 'follow_id', 'following_id')


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'user_id', 'store_id')

class WishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wish
        fields = ('id', 'user_id', 'store_id')

class ChangePassword(serializers.Serializer):
    u_password = serializers.CharField(help_text="비밀번호")