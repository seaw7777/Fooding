from rest_framework import serializers

class uploadImage(serializers.Serializer):
    user_id = serializers.IntegerField(help_text="유저 ID")
    name = serializers.CharField(help_text="파일 이름")
    file = serializers.ImageField(help_text="이미지 파일")