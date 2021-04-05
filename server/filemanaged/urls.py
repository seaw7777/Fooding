from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import fileUp

app_name = 'filemanaged'

urlpatterns = [
    path('fileupload/' , fileUp.as_view({"post":"fileupload"})),
]+ static(settings.MEDIA_URL , document_root=settings.MEDIA_ROOT)