from rest_framework import serializers
from accounts.models import User


class InfluencerSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ('id','nickname', 'spoon_cnt','grade')