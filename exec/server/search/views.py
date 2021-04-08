from django.shortcuts import render
from stores.models import Store
from stores.serializers import StoreSerializer
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from accounts.models import User
from accounts.serializers import UserSerializer
# Create your views here.
@api_view(['GET'])
def searchstore(request,store_name):
    store_list = Store.objects.filter(store_name__startswith = store_name)
    serializer = StoreSerializer(store_list, many=True)
    return Response(serializer.data ,status=status.HTTP_200_OK)

@api_view(['GET'])
def influencer_list(request,id):  #랭크높은 푸더들 추천
    influencer = User.objects.exclude(id = id).order_by('-spoon_cnt')
    dummy = []
    for i in influencer:
        if(i.spoon_cnt >= 100):
            dummy.append(i)
    
    serializer = UserSerializer(dummy,many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
