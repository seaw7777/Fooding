from django.urls import path
from . import views

app_name = 'stores'

urlpatterns = [
    path('detail/<int:id>/', views.store_detail)
]