from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import InfluencerSerializer
from accounts.models import User

# import boto3

# Create your views here.
#인플루언서(10인) 목록 불러오기
@api_view(['GET'])
def influencer_list(request):  #id로 회원 취향 비슷한 인플루언서 추천?
    influencer = User.objects.filter().order_by('-spoon_cnt')
    dummy = []
    for i in influencer:
        if(i.spoon_cnt >= 100):
            dummy.append(i)
    serializer = InfluencerSerializer(dummy, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

# 파일 업로드

def post_image(request):
    if request.method =='POST':
        if len(request.FILES) != 0:
            s3_client = boto3.client(
                's3',
                aws_access_key_id = "AWS_ACCESS_KEY_ID",
                aws_secret_access_key = "AWS_SECRET_ACCESS_KEY",
            )
            file = request.FILE['myfile']
            s3_client.upload_fileobj(
                file,
                "bucket-name",
                "file-name",
                ExtraArgs={
                    "ContentType": file.content_type,
                }
            )
            return JsonResponse({'message':'success'})
        else:
            return JsonResponse({'message':'file_none'})


# 파일 삭제

def delete_image(request):
    
    if request.method == 'POST':
        image_id = request.POST.get('image_id', '')
        image = get_object_or_404(food_image, id = image_id)

        s3_client = boto3.client(
            's3',
            aws_access_key_id="AWS_ACCESS_KEY_ID",
            aws_secret_access_key="AWS_SECRET_ACCESS_KEY,"
        )
        key = "image-name"
        s3_client.delete_object(Bucket='bucket-name', Key=key)
        
        image.delete()  

        return JsonResponse({'message':'delete'})

    return JsonResponse({'message':'not POST'})

