from django.shortcuts import render
# from numpy import dot
# import numpy as np
# from numpy.linalg import norm
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from reviews.models import Review
from stores.models import Store
from accounts.models import Follow

# from .serializers import RecommendSerializer

from accounts.models import User

from .models import reviewcategory

# Create your views here.

# 리뷰 카테고리 테이블 넣기
def insert_data(data,user_id):
    if reviewcategory.objects.filter(user_id=user_id).exists() :
        print()
    else :
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

def categorysearch(my_interest):
    dic = []
    print(my_interest)
    if(my_interest.krzzimandtang != 0):
        dic.append("한식찜/탕")
    if(my_interest.krbbq  != 0):
        dic.append("한식고기집")
    if(my_interest.krgukbap  != 0):
        dic.append("한식국밥")
    if(my_interest.krstewandcasserole != 0):
        dic.append("한식전골/찌개")
    if(my_interest.krporkfeetandBossam != 0):
        dic.append("한식족발/보쌈")
    if(my_interest.krseafood != 0):
        dic.append("한식해산물")
    if(my_interest.krhomecooking != 0):
        dic.append("한식가정식")
    if(my_interest.krnoodles != 0):
        dic.append("한식면요리")
    if(my_interest.krchicken != 0):
        dic.append("한식치킨")
    if(my_interest.krfood != 0):
        dic.append("한식한식")
    if(my_interest.bunsick != 0):
        dic.append("분식분식")
    if(my_interest.jpfriedfood != 0):
        dic.append("일식튀김")
    if(my_interest.jpsashimi != 0):
        dic.append("일식회")
    if(my_interest.jphomecooking != 0):
        dic.append("일식가정식")
    if(my_interest.jpseafood != 0):
        dic.append("일식어패류")
    if(my_interest.jpnoodles != 0):
        dic.append("일식면요리")
    if(my_interest.jpfood != 0):
        dic.append("일식일식")
    if(my_interest.cddrink != 0):
        dic.append("카페음료")
    if(my_interest.cdcafe != 0):
        dic.append("카페카페")
    if(my_interest.cddessert != 0):
        dic.append("카페디저트")
    if(my_interest.chnoodles != 0):
        dic.append("중식면요리")
    if(my_interest.chfriedfood != 0):
        dic.append("중식튀김요리")
    if(my_interest.chbbq != 0):
        dic.append("중식구이요리")
    if(my_interest.chfood != 0):
        dic.append("중식중식")
    if(my_interest.wenoodles != 0):
        dic.append("양식면요리")
    if(my_interest.wepizza != 0):
        dic.append("양식피자")
    if(my_interest.wesalad != 0):
        dic.append("양식샐러드")
    if(my_interest.wefood != 0):
        dic.append("양식해외요리")
    if(my_interest.brbar != 0):
        dic.append("술집술집")
    if(my_interest.brjpanbar != 0):
        dic.append("술집일본선술집")
    if(my_interest.bkbakery != 0):
        dic.append("빵집빵집")
    if(my_interest.fffood != 0):
        dic.append("패스트푸드햄버거")
    print("확인")
    print(dic)
    return dic
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

#추천인 연산해서 리턴하기
@api_view(['GET'])
def recommendforyou(request,id):
    print(id)
    info_list = list(reviewcategory.objects.exclude(user_id = id).values())
    myinfo = reviewcategory.objects.filter(user_id = id).values()
    result_list = calcos(myinfo,info_list)
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

#가게추천 연산해서 리턴하기
@api_view(['POST'])
def recommendforStore(request):
    id = request.data.get("user_id")
    # print(id)
    if User.objects.filter(id=id).exists():
        # print(id)
        follower_id = Follow.objects.filter(following_id=id)
        my_interest = reviewcategory.objects.get(user_id = id)
        # print(my_interest.cddrink)
        # for i in follower_id:
        #     print(i.follow_id)
        my_category = categorysearch(my_interest)
        # print(my_category)
        follower = []

        for f in follower_id:
            fw = User.objects.get(id=f.follow_id)

            follower.append({
                "id": fw.id,
                "nickname": fw.nickname,
                "email": fw.email,
                "address": fw.address,
                "spoon_cnt": fw.spoon_cnt,
            })
        store = []
        review = []
        for r in follower:
            rv = Review.objects.filter(id=r['id']).values()
            # print(rv)
            for st in rv:
                string = Store.objects.get(id=st['store_id'])
                for j in my_category:
                    if(j == (string.main_category+string.middle_category)):
                        print("진입")
                        store.append({
                            "id": string.id,
                            "store_name": string.store_name,
                            "area" : string.area,
                            "tel" : string.tel,
                            "address" : string.address,
                            "lat" : string.lat,
                            "lng" : string.lng,
                            "main_category" : string.main_category,
                            "middle_category" : string.middle_category,
                            "review_cnt" : string.review_cnt,
                            "star" : string.star
                        })
        # print("스토어 정보")
        # for i in store:
        #     print(i['store_name'])
        return JsonResponse(store,safe = False, json_dumps_params={'ensure_ascii': False} ,status=status.HTTP_200_OK)
    else:
        return Response({'message': '회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)

    