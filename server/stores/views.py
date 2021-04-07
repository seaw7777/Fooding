from django.http.response import JsonResponse
from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import StoreSerializer, MenuSerializer
from .models import Store, Menu
from accounts.models import Wish


# Create your views here.
#가게상세정보 불러오기
@api_view(['GET'])
def store_detail(request, store_id, user_id):
    store = Store.objects.get(id=store_id)

    stores = []

    if Wish.objects.filter(store_id=store_id, user_id=user_id):
        stores.append({
            "store_name" : store.store_name,
            "area" : store.area,
            "tel" : store.tel,
            "address" : store.address,
            "lat" : store.lat,
            "lng" : store.lng,
            "main_category" : store.main_category,
            "middle_category" : store.middle_category,
            "image" : store.image,
            "review_cnt" : store.review_cnt,
            "isWish" : True,
        })
    else:
        stores.append({
            "store_name" : store.store_name,
            "area" : store.area,
            "tel" : store.tel,
            "address" : store.address,
            "lat" : store.lat,
            "lng" : store.lng,
            "main_category" : store.main_category,
            "middle_category" : store.middle_category,
            "image" : store.image,
            "review_cnt" : store.review_cnt,
            "isWish" : False,
        })

    return JsonResponse(stores, safe=False, json_dumps_params={'ensure_ascii': False}, status=status.HTTP_200_OK)


#가게메뉴 불러오기
@api_view(['GET'])
def menu_list(request, store_id):
    menu = Menu.objects.filter(store_id=store_id)

    serializer = MenuSerializer(menu, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


#가게목록 불러오기
@api_view(['GET'])
def store_list(request):
    list = Store.objects.all().order_by('-star')[:10]

    serializer = StoreSerializer(list, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)
