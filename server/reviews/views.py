from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import ReviewSerializer
from .models import Review
from accounts.models import User

# Create your views here.
#회원별 리뷰 불러오기
@api_view(['GET'])
def review_info(request, id):
    if User.objects.filter(id=id).exists():
        review = Review.objects.filter(user_id=id)

        serializer = ReviewSerializer(review, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        return Response({'message':'회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)