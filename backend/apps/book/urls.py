from django.urls import path
from apps.book.api_endpoints.books.book_list.views import BookListView
from apps.book.api_endpoints.books.book_detail.views import BooksDetailView, BookUpdateView, BookDeleteView
from apps.book.api_endpoints.user.user_list.views import CustomUserListView
from apps.book.api_endpoints.user.user_detail.views import CustomUserDetailView
from apps.book.api_endpoints.category.category_detail.views import CategoryDeleteView, CategoryDetailView, CategoryUpdateView
from apps.book.api_endpoints.category.category_list.views import CategoryListView
from apps.book.api_endpoints.category.category_create.views import CategoryCreateView

urlpatterns = [
    path('books/', BookListView.as_view(), name='book-list'),
    path('books/<int:pk>/', BooksDetailView.as_view(), name='book-detail'),
    path("books/<int:pk>/update/", BookUpdateView.as_view(), name="book-update"),
    path("books/<int:pk>/delete/", BookDeleteView.as_view(), name="book-delete"),
    
    
    path('users/', CustomUserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', CustomUserDetailView.as_view(), name='user-detail'),
    
    
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    path("categories/", CategoryListView.as_view(), name="category-list"),
    path("categories/create/", CategoryCreateView.as_view(), name="category-create"),
    path('categories/<int:pk>/update/', CategoryUpdateView.as_view(), name='category-update'),
    path("categories/<int:pk>/delete/", CategoryDeleteView.as_view(), name="category-delete"),
]
