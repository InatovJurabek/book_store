from rest_framework import serializers
from apps.book.models import Books


class BooksDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = ['id', 'title', 'description', 'author', 'cover', 
                  'release_year', 'category_id', 'new_column', 'price', 'stock']
          
        
    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("Kitob nomi bo‘sh bo‘lishi mumkin emas.")
        return value


    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Narx musbat bo‘lishi kerak.")
        return value