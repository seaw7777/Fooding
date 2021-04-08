from django.urls import path
from . import views

app_name = 'search'

urlpatterns = [
    path('searchstore/<str:store_name>/', views.searchstore),
    path('influencerList/<int:id>/', views.influencer_list),
]