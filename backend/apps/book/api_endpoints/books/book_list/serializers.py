from rest_framework import serializers
from apps.book.models import Books

class BookListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = ['id', 'title', 'description', 'author', 'cover', 
                  'release_year', 'category_id', 'new_column', 'price', 'stock']
        
        depth = 1