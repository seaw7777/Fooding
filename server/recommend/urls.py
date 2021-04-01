from django.urls import path
from . import views

app_name = 'recommend'

urlpatterns = [
    path('recommenduser/<int:id>/', views.recommenduser),
    path('recommendtest/',views.test),
    path('recommendstore/',views.recommendforStore)
]