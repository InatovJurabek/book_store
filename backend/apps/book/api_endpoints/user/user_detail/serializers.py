from rest_framework import serializers
from apps.book.models import CustomUser


class CustomUserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'phone_number', 'address']
        
             
    def validate_email(self, value):
        if not value or "@" not in value:
            raise serializers.ValidationError("To‘g‘ri email kiriting.")
        return value