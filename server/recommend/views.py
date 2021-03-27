from django.shortcuts import render
from numpy import dot
import numpy as np
from numpy.linalg import norm
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from reviews.models import Review
from stores.models import Store
from django.http import JsonResponse
# from .serializers import RecommendSerializer

from accounts.models import User

from .models import reviewcategory

# Create your views here.
#추천인 연산해서 리턴하기
# @api_view(['GET'])
# def recommenduser(request, id):
#     if User.objects.filter(id=id).exists():
#         recommend = Recommend.objects.filter(user_id=id)
#         print(recommend)
#         serializer = RecommendSerializer(recommend, many=True)
#
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#     else:
#         return Response({'message':'회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)

# 리뷰 카테고리 테이블 넣기
def insert_data(data,user_id):
    reviewcategory.objects.create(
        user_id = user_id ,
        krzzimandtang = data[0],
        krbbq = data[1],
        krgukbap = data[2],
        krstewandcasserole = data[3],
        krporkfeetandBossam = data[4],
        krseafood = data[5],
        krnoodles = data[6],
        krhomecooking = data[7],
        krchicken=data[8],
        krfood=data[9],
        bunsick=data[10],
        jpfriedfood=data[11],
        jpsashimi=data[12],
        jphomecooking=data[13],
        jpseafood=data[14],
        jpnoodles=data[15],
        jpfood=data[16],
        cddrink=data[17],
        cdcafe=data[18],
        cddessert=data[19],
        chnoodles=data[20],
        chfriedfood=data[21],
        chbbq=data[22],
        chfood=data[23],
        wenoodles=data[24],
        wepizza=data[25],
        wesalad=data[26],
        wefood=data[27],
        brbar=data[28],
        brjpanbar=data[29],
        bkbakery=data[30],
        fffood=data[31]
    ).save()
    pass
def calcos(myinfo,info_list):
    index = [0]*34
    A={}
    result = {}
    for i , (key, value) in enumerate(myinfo[0].items()):
        index[i] = value
    del index[0]
    del index[0]
    for i in range(len(info_list)):
        B = [0]*34
        for j ,(key,value) in enumerate(info_list[i].items()):
            B[j] = value
        del B[0]
        del B[0]
        re = dot(index, B) / (norm(index) * norm(B))
        str = info_list[i]['user_id']
        result[str] = re
    for key,value in result.items():
        if value != 0:
            A[key] = value
    dummy = sorted(A.items(),key=lambda x:x[1],reverse=True)
    return dummy

@api_view(['GET'])
def test(request):
    review = Review.objects.all().order_by('user_id').values()
    dic = ["한식찜/탕","한식고기집","한식국밥","한식전골/찌개","한식족발/보쌈","한식해산물",
           "한식면요리","한식가정식","한식치킨","한식한식","분식분식","일식튀김","일식회","일식가정식","일식어패류","일식면요리","일식일식",
           "중식면요리","중식튀김요리","중식구이요리","중식중식","양식면요리","양식피자","양식샐러드","양식해외요리","술집술집","술집일본선술집",
           "빵집빵집","패스트푸드햄버거","카페음료","카페카페","카페디저트"]
    data = [0]*32
    print(len(dic),len(data))
    # print(review)
    # print(len(review))
    user_id = review[0]['user_id']
    for i in range(len(review)):
        if user_id != review[i]['user_id']:
            insert_data(data,user_id)
            data = [0] * 32
            user_id = review[i]['user_id']
        store = Store.objects.filter(id__in=[review[i]['store_id']]).values('main_category','middle_category')
        for j in range(len(store)):
            string = store[j]['main_category']+store[j]['middle_category']
            for p in range(len(dic)):
                if dic[p] == string:
                    data[p]+=1
                    break
    insert_data(data, user_id)
    return Response({'message':'성공'},status=status.HTTP_200_OK)
    # else:
    #     return Response({'message':'가공성공'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def recommendforyou(request,id):
    print(id)
    info_list = list(reviewcategory.objects.exclude(user_id = id).values())
    myinfo = reviewcategory.objects.filter(user_id = id).values()
    # print(info_list[0]['user_id'])
    # print(myinfo[0]['user_id'])
    result_list = calcos(myinfo,info_list)
    print("확인")
    print(result_list)
    for i in result_list:
        print(i[0])
    recommend_follower =[]
    for i in result_list:
        user = User.objects.get(id=i[0])
        recommend_follower.append({
            "id": user.id,
            "nickname": user.nickname,
            "email": user.email,
            "address": user.address,
            "spoon_cnt": user.spoon_cnt,
        })
    return JsonResponse(recommend_follower,safe = False, json_dumps_params={'ensure_ascii': False} ,status=status.HTTP_200_OK)