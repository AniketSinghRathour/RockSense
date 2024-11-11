from django.urls import path
from . import views

urlpatterns = [
    path('', views.identify, name='identify'),
    path('upload/', views.upload, name='upload'),
    path('after/', views.after, name='after'),
]