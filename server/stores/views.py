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
