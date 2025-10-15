from django.db import models
from apps.common.models import  BaseModel
from django.contrib.auth.models import AbstractUser



class Books(BaseModel):
        title = models.CharField(max_length=100)
        description = models.TextField(blank=True, null=True)
        author = models.CharField(max_length=100)
        cover = models.ImageField(upload_to='covers/')
        release_year = models.IntegerField()
        category_id = models.ForeignKey('Category', on_delete=models.PROTECT)
        # image = models.ImageField(upload_to='books/', blank=True, null=True)
        new_column= models.CharField()
        price = models.DecimalField(max_digits=10, decimal_places=2)
        stock = models.IntegerField()
        
        
        def __str__(self):
           return self.title
   
   
        @property
        def image_url(self):
            """Rasm URL ini olish"""
            if self.image and hasattr(self.image, 'url'):
             return self.image.url
            return None

        
class CustomUser(AbstractUser):
        phone_number = models.CharField(max_length=20, blank=True, null=True)
        address = models.TextField(blank=True, null=True)
        
        
        
class Category(BaseModel):
        title = models.CharField(max_length=100)
        description = models.TextField()
       
        def __str__(self):
           return self.title
        
        
        
        
class Publisher(BaseModel):
        publisher = models.ForeignKey(Books, on_delete=models.PROTECT)
        title = models.CharField(max_length=100)
        address = models.CharField(max_length=100)
        description = models.TextField()
        
        
        def __str__(self):
           return self.title


class Cart(BaseModel):
        user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
        book = models.ForeignKey(Books, on_delete=models.CASCADE)
        quantity = models.IntegerField(default=0, blank=True, null=True)
        date_added = models.DateTimeField(auto_now_add=True)
        
        def __str__(self):
           return self.title
        
        
class Order(BaseModel):
        user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
        status = models.CharField()
        total_price = models.DecimalField(max_digits=10, decimal_places=2)
        

        def __str__(self):
           return self.title
        
        
        
        
        
 