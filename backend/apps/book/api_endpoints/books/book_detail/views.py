from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics

from apps.book.api_endpoints.books.book_detail.serializers import BooksDetailSerializer
from apps.book.models import Books
from rest_framework.permissions import IsAuthenticated



class BooksDetailView(APIView):
    def get(self,request, pk):
        book = get_object_or_404(Books, id=pk)
        serializer = BooksDetailSerializer(book)
        return Response(serializer.data)
    
__all__ = ['BooksDetailView']



class BookCreateView(generics.CreateAPIView):
    queryset = Books.objects.all()
    serializer_class = BooksDetailSerializer
    permission_classes = [IsAuthenticated]
    
    

class BookUpdateView(generics.UpdateAPIView):
    queryset = Books.objects.all()
    serializer_class = BooksDetailSerializer



class BookDeleteView(generics.DestroyAPIView):
    queryset = Books.objects.all()
    serializer_class = BooksDetailSerializer