from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import os
from drf_yasg.utils import swagger_auto_schema
from django.views import View
from .serializers import uploadImage

# Create your views here.
@api_view(['POST'])
def fileupload(request):
    file = request.FILES.getlist('files')
    # file = request.FILES['files']
    print(file)
    print(" 파일길이 : " + str(len(file)))
    print(request.POST)
    print(request.FILES)
    # user_id = request.data.get('user_id')
    # print(user_id)
    index = 0
    print(len(file))
    for i in file:
        i.name = str(index) + "test.png" 
        path = i.name
        print(path)
        while default_storage.exists("store"+'/'+path):
            index+=1
            i.name = str(index) + "test.png"
            path = i.name
            print(path)
        path = default_storage.save("store"+'/'+i.name, i)
        print(path)
        
    return Response(status=status.HTTP_200_OK)