from rest_framework import generics
from apps.book.models import Category
from apps.book.api_endpoints.category.category_list.serializers import CategoryListSerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer
    