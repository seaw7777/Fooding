from rest_framework import serializers
from .models import Store, Menu


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ('id', 'store_name', 'area', 'tel', 'address', 'lat', 'lng', 'main_category', 'middle_category', 'star', 'review_cnt','parent','friend','children','pet','image')


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ('id', 'price', 'name')