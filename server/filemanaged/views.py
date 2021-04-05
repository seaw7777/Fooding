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

# Create your views here.
@api_view(['POST'])
def fileupload(request):
    file = request.FILES.getlist('files')
    print(request.method)
    # print(request.FILES)
    # user_id = request.data.get('user_id')
    # print(user_id)
    for i in file:
    #     print(i)
        # i.save('test.png',content,save=True)       
        path = default_storage.save('./media', ContentFile(i.read()))
        # os.renames(i , "C:/SSAFY/IMG/test.png")
        # tmp_file = os.path.join(settings.MEDIA_ROOT, path)
        

    return Response(status=status.HTTP_200_OK)