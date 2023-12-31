from django.urls import path, include
from rest_framework import routers

from usuarios.views import UsuarioView


router = routers.DefaultRouter()
router.register('usuarios', UsuarioView)

urlpatterns = [
    path('usuarios/', include(router.urls)) 
]

