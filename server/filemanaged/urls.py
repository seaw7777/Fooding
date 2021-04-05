from django.urls import path
from . import views
from .views import fileUp
app_name = 'filemanaged'

urlpatterns = [
    path('fileupload/' , fileUp.as_view({"post":"fileupload"})),
]