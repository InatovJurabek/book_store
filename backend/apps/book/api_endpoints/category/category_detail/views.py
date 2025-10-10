from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics

from apps.book.api_endpoints.category.category_detail.serializers import CategoryDetailSerializer, CategoryUpdateSerializer
from apps.book.models import  Category






class CategoryDetailView(APIView):
    def get(self,request, pk):
        category = get_object_or_404(Category, id = pk)
        serializer = CategoryDetailSerializer(category)
        return Response(serializer.data)
    
    



class CategoryUpdateView(APIView):
    def put(self, request, pk):
        category = get_object_or_404(Category, id=pk)
        serializer = CategoryUpdateSerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class CategoryDeleteView(generics.DestroyAPIView):
    queryset = Category.objects.all()

__all__ = ["CategoryDetailView", "CategoryUpdateView", "CategoryDeleteView"]
