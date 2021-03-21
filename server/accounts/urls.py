from django.urls import path, include
from . import views

app_name = 'accounts'

urlpatterns = [
    path('signup/', views.signup),
    path('login/', views.login),
    path('userInfo/<int:id>/', views.user_info),
    path('followerInfo/<int:id>/', views.follower_info),
    path('followingInfo/<int:id>/', views.following_info),
    path('likeInfo/<int:id>/', views.like_info),
]