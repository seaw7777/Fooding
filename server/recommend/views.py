from django.shortcuts import render
from numpy import dot
import json
import numpy as np
import pandas as pd
from numpy.linalg import norm
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from reviews.models import Review
from stores.models import Store
from accounts.models import Follow,User,Wish
import random

# from .serializers import RecommendSerializer

from .models import reviewcategory

# Create your views here.

# 리뷰 카테고리 테이블 넣기
def insert_data(data,user_id):
    if reviewcategory.objects.filter(user_id=user_id).exists() :
        pass
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

def calcos(myinfo,info_list):

    index = [0]*34
    A={}
    result = {}
    returnresult = []


    for i , (key, value) in enumerate(myinfo[0].items()):
        index[i] = value

    # 필요없는 데이터 제거
    del index[0]
    del index[0]
    for i in range(len(info_list)):
        B = [0]*34
        for j ,(key,value) in enumerate(info_list[i].items()):
            B[j] = value

        # 필요없는 데이터 제거
        del B[0]
        del B[0]
        
        # 빅데이터 분석
        re = dot(index, B) / (norm(index) * norm(B))
        strindex = info_list[i]['user_id']
        result[strindex] = re

    # 연관성 0 인 사람을 제외하고 전부다 리스트 삽입
    for key,value in result.items():
        if value != 0:
            A[key] = value

    # 연관성 가장 높은순으로 정렬
    dummy = sorted(A.items(),key=lambda x:x[1],reverse=True)

    # 분석 결과 값에서 id만 추출하여 리턴
    for i in dummy:
        returnresult.append(i[0])
    return returnresult

def categorysearch(my_interest):
    dic = []
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
    return dic

def region_index(region_name):
    dummy = {'경북' : '경상북도','경남':'경상남도','충북':'충청북도','충남':'충청남도','전북':'전라북도','전남':'전라남도', '경기' :'경기도','강원':'강원도'}
    returnindex = []
    returnindex.append(region_name)
    returnindex.append(dummy[region_name])
    return returnindex

#추천인 연산해서 리턴하기
@api_view(['GET'])
def recommenduser(request,id):
    info_list = list(reviewcategory.objects.exclude(user_id = id).values())
    myinfo = reviewcategory.objects.filter(user_id = id).values()
    result_list = calcos(myinfo,info_list)
    follower_list = Follow.objects.filter(following_id = id).values('follow_id')

    recommend_follower =[]
    
    # 추천인에 팔로우 한사람은 안뜨게 제거
    for i in follower_list:
        try:
            result_list.remove(i['follow_id'])
        except ValueError:
            pass
    
    # 정보 넣어서 리턴
    for i in result_list:
        user = User.objects.get(id=i)
        recommend_follower.append({
            "id": user.id,
            "nickname": user.nickname,
            "email": user.email,
            "address": user.address,
            "spoon_cnt": user.spoon_cnt,
            "grade" : user.grade,
        })

    return JsonResponse(recommend_follower,safe = False, json_dumps_params={'ensure_ascii': False} ,status=status.HTTP_200_OK)

#가게추천 연산해서 리턴하기
@api_view(['GET'])
def recommendStore(request,id):
    if User.objects.filter(id=id).exists():

        region_name = User.objects.filter(id=id).values('address')
        region_name = region_name[0]['address'].split()
        
        follower_id = Follow.objects.filter(following_id=id)
        
        my_interest = reviewcategory.objects.get(user_id = id)
        my_category = categorysearch(my_interest)
        wish_store = Wish.objects.filter(user_id = id)

        follower = []
        store = []
        dummy_store = []
        dummy_store2 = []
        review = []
        flag = False
        search_index = []

        #팔로우 한 사람들 id 받아오기
        for f in follower_id:
            fw = User.objects.get(id=f.follow_id)
            follower.append(fw.id)

        if(region_name[0] in ("서울","부산","대구","인천","광주","울산","대전","제주","세종")):
            flag = True
        else:
            search_index = region_index(region_name[0])

        #팔로우 된 사람들이 쓴 리뷰중 사용자에게 맞는 음식점 목록 불러오기
        #특별시 및 광역시 와 각종 도를 구분하여 검색
        if(flag == True):
            for fwid in follower:
                rv = Review.objects.filter(id=fwid).values()
                
                for st in rv:
                    string = Store.objects.get(id=st['store_id'])
                    for j in my_category:
                        if(j == (string.main_category+string.middle_category) and region_name[0] in string.address):
                            dummy_store.append(string.id)
        else:
            for fwid in follower:
                rv = Review.objects.filter(id=fwid).values()
                for st in rv:
                    string = Store.objects.get(id=st['store_id'])
                    for j in my_category:
                        if(j == (string.main_category+string.middle_category) and region_name[1] in string.address):
                            if(search_index[0] in string.address or search_index[1] in string.address):
                                dummy_store.append(string.id)
        
        #중복제거
        for i in dummy_store:
            if i not in dummy_store2:
                dummy_store2.append(i)

        # 좋아요된 가게제거
        for i in wish_store:
            try:
                dummy_store2.remove(i.store_id)
            except ValueError:
                pass

        # 가게 정보 입력
        for i in dummy_store2:
            string = Store.objects.get(id=i)
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
                            "star" : string.star,
                            "pet" : string.pet,
                            "children" : string.children,
                            "parent" : string.parent,
                            "friend" : string.friend
                        })


        return JsonResponse(store,safe = False, json_dumps_params={'ensure_ascii': False} ,status=status.HTTP_200_OK)
    else:
        return Response({'message': '회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)

# 동행자 가게 추천
@api_view(['POST'])
def recommendcompanion(request):
    id = request.data.get('user_id')
    companion = request.data.get('companion')
    if User.objects.filter(id = id).exists():
        
        user = User.objects.get(id = id)
        region_name = user.address
        region_name = region_name.split()
                
        if(region_name[0] in ("서울","부산","대구","인천","광주","울산","대전","제주","세종")):
            dataframe = pd.DataFrame(list(Store.objects.filter(address__contains = region_name[0]).values()))
        else:
            search_index = region_index(region_name[0])
            dataframe = pd.DataFrame(list(Store.objects.filter(address__contains = search_index[0]).values() | Store.objects.filter(address__contains = search_index[1]).values()))
        
        pd.set_option('display.max_rows', None)
        
        df_store = dataframe[dataframe['address'].str.contains(region_name[1])]
        
        df_sort = df_store.sort_values(by=companion, ascending=False).head(200)
        
        js = df_sort.to_json(orient = 'records' ,force_ascii = False)
        
        
        return JsonResponse(json.loads(js),safe = False ,status=status.HTTP_200_OK)
    else:
        return Response({'message':'실패'},status=status.HTTP_400_BAD_REQUEST)