from django.urls import path
from . import views

app_name = 'recommend'

urlpatterns = [
    path('recommendforyou/<int:id>/', views.recommendforyou),
    path('recommenduser',views.test),
    path('recommendforStore/<int:id>/',views.recommendforStore)
]