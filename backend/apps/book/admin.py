from django.contrib import admin
from apps.book.models import *


admin.site.register(Books)
admin.site.register(CustomUser)
admin.site.register(Publisher)
admin.site.register(Category)
admin.site.register(Order)
admin.site.register(Cart)

