from django.contrib import admin
from django.urls import path, include
from django.conf import settings 
from django.conf.urls.static import static

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include("apps.book.urls")),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)



# from django.contrib import admin
# from django.urls import path, include
# from django.conf import settings
# from django.conf.urls.static import static
# from django.views.generic import TemplateView

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/', include('book.urls')),
#     path('api/auth/', include('user.urls')),
#     path('api/cart/', include('cart.urls')),

#     path('', TemplateView.as_view(template_name='index.html'), name='home'),
#     path('books/', TemplateView.as_view(template_name='index.html')),
#     path('categories/', TemplateView.as_view(template_name='index.html')),
#     path('cart/', TemplateView.as_view(template_name='index.html')),
#     path('profile/', TemplateView.as_view(template_name='index.html')),
# ]


# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
#     urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)