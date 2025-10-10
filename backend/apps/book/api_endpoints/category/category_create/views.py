from rest_framework import generics
from rest_framework.response import Response
from apps.book.api_endpoints.category.category_create.serializers import CategoryCreateSerializer 
from apps.book.models import Category

class CategoryCreateView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryCreateSerializer