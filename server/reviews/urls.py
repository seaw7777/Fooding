from django.urls import path
from . import views

app_name = 'reviews'

urlpatterns = [
    path('reviewInfo/<int:id>/', views.review_info),
    path('review_list/<int:store_id>/', views.review_list),
    path('review_cur/', views.review_cur),
    path('review_del/<int:id>/', views.review_del),
    path('review_write/', views.review_write),
]
