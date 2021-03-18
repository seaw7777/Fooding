from rest_framework import serializers
from .models import Follow, Like, User

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ('email', 'password')
        

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ('id','nickname','email','password','address','spoon_cnt')