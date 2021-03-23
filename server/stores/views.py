from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import StoreSerializer, MenuSerializer
from .models import Store, Menu


# Create your views here.
#가게상세정보 불러오기
@api_view(['GET'])
def store_detail(request, id):
    store = Store.objects.get(id=id)

    serializer = StoreSerializer(store)

    return Response(serializer.data, status=status.HTTP_200_OK)


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
