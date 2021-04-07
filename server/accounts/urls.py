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
    path('change_pw/', views.change_pw),
    path('change_address/', views.change_address),
    path('make_follower/<int:user_id>&&<int:follower_id>/', views.make_follower),
    path('delete_follower/<int:user_id>&&<int:follower_id>/', views.delete_follower),
    path('check_follow/<int:user_id>&&<int:follower_id>/', views.check_follow),
    path('make_wish/<int:user_id>&&<int:store_id>/', views.make_wish),
    path('delete_wish/<int:user_id>&&<int:store_id>/', views.delete_wish),
    path('select_wish/<int:user_id>/', views.select_wish),
    path('change_profile_image/',views.change_image),
]