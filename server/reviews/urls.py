from django.urls import path
from . import views

app_name = 'reviews'

urlpatterns = [
    path('reviewInfo/<int:id>/', views.review_info),
]