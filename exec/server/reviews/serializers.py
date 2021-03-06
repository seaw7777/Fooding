from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Review
        fields = ('id', 'user_id', 'contents', 'write_date', 'store_id', 'star','image')