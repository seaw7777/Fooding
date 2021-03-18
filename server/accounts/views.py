from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import SignupSerializer, UserSerializer
from .models import Follow, Like, User


# Create your views here.
#회원가입
@api_view(['POST'])
def signup(request):
    # password = request.data.get('password')
    # password_confirm = request.data.get('passwordConfirm')

    # if password != password_confirm:
    #     return Response({'error': '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        if User.objects.filter(email=request.data.get('email')).exists():
            return Response({'message': '이미 존재하는 이메일입니다.'}, status=status.HTTP_400_BAD_REQUEST)

        User.objects.create(
            email=request.data.get('email'),
            nickname=request.data.get('nickname'),
            password=request.data.get('password'),
            address=request.data.get('address'),
            spoon_cnt=0,
        ).save()

        return Response(status=status.HTTP_201_CREATED)

    except KeyError:
        return Response({'error': 'KeyError'}, status=status.HTTP_400_BAD_REQUEST)


