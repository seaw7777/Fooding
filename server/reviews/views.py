from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import ReviewSerializer
from .models import Review, Store
from accounts.models import User

from reviews import serializers

# Create your views here.
# 회원별 리뷰 불러오기


@api_view(['GET'])
def review_info(request, id):
    if User.objects.filter(id=id).exists():
        print("확인용")
        review = Review.objects.filter(user_id=id)
        print(review[1].star)
        # print(review.values())
        for i in review:
            for key , value in i.items():
                 print(key , value)
        serializer = ReviewSerializer(review, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        return Response({'message': '회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)


# 가게별 리뷰 불러오기
@api_view(['GET'])
def review_list(request, store_id):
    if Store.objects.filter(id=store_id).exists():
        review = Review.objects.filter(store_id=store_id)
        print(review)
        serializer = ReviewSerializer(review, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        return Response({'message': '가게정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)


# 리뷰 목록 불러오기(최신 날짜 순 30개)
@api_view(['GET'])
def review(request):
    list = Review.objects.all().order_by('-write_date')[:30]

    serializer = ReviewSerializer(list, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)
