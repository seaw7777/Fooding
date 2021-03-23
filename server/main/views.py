from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import InfluencerSerializer
from accounts.models import User

# Create your views here.
#인플루언서(10인) 목록 불러오기
@api_view(['GET'])
def influencer_list(request, id):  #id로 회원 취향 비슷한 인플루언서 추천?
    influencer = User.objects.all().order_by('-spoon_cnt')[:10]

    serializer = InfluencerSerializer(influencer, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


