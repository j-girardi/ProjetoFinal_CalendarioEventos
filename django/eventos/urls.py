from django.urls import path, include
from rest_framework import routers
from eventos.views import TipoEventoView

from eventos.views import EventoView


router = routers.DefaultRouter()
router.register('eventos', EventoView)  # nome do objeto da view
router.register('categorias', TipoEventoView)  


urlpatterns = [
    path('eventos/', include(router.urls)),  # nome do app
]