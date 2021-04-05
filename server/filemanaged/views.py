from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from django.views import View
from .serializers import uploadImage

# Create your views here.
class fileUp(viewsets.GenericViewSet, View):
    @swagger_auto_schema(request_body=uploadImage)
    def fileupload(request):
        return Response(status=status.HTTP_200_OK)