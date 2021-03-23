from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('influencerList/<int:id>/', views.influencer_list),
]