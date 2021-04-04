from django.urls import path
from . import views

app_name = 'filemanaged'

urlpatterns = [
    path('fileupload/' , views.fileupload)
]