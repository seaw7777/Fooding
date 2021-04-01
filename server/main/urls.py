from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('influencerList/', views.influencer_list),
]