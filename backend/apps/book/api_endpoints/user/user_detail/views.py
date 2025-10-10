from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.book.api_endpoints.user.user_detail.serializers import CustomUserDetailSerializer
from apps.book.models import CustomUser


class CustomUserDetailView(APIView):
    def get(self,request, pk):
        user  = get_object_or_404(CustomUser, id=pk)
        serializer = CustomUserDetailSerializer(user)
        return Response(serializer.data)
    
__all__ = ["CustomUserDetailView"]
