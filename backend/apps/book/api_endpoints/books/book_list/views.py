from rest_framework import generics
from apps.book.models import Books
from .serializers import BookListSerializer
from apps.book.api_endpoints.books.book_detail.serializers import BooksDetailSerializer


class BookListView(generics.ListAPIView):
    queryset = Books.objects.all()
    serializer_class = BookListSerializer
    
    
class BookListCreateView(generics.ListCreateAPIView):
    queryset = Books.objects.all()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return BooksDetailSerializer
        return BookListSerializer