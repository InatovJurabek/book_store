from rest_framework import generics
from apps.book.models import CustomUser
from .serializers import CustomUserListSerializer

class CustomUserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserListSerializer
    