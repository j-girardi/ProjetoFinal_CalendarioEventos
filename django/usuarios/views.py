from rest_framework import serializers
from rest_framework import viewsets

from usuarios.models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('nome', 'email')

class UsuarioView(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    http_method_names = ['get', 'post', 'put', 'delete']