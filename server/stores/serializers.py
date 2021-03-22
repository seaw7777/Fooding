from rest_framework import serializers
from .models import Store, Menu


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        field = ('id', 'name', 'branch', 'area', 'tel', 'address', 'lat', 'lng', 'main_category', 'middle_category', 'star', 'review_cnt', 'start_time', 'end_time')


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        field = ('id', 'store_id', 'price', 'name')