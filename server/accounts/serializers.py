from rest_framework import serializers
from .models import Follow, Like, User


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