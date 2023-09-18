from django.shortcuts import render
from rest_framework import serializers
from rest_framework import viewsets
from eventos.models import Evento, TipoEvento
from rest_framework import filters
from rest_framework.permissions import SAFE_METHODS

# from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend

class TipoEventoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = TipoEvento
        fields = ('id', 'nome')

class EventoSerializer(serializers.ModelSerializer):
    # tipos_evento = serializers.SlugRelatedField(
    #     queryset=TipoEvento.objects.all(),
    #     slug_field='nome'  
    # )
    class Meta:
        model = Evento
        fields = ('id', 'nome', 'data', 'cep', 'rua', 'numero', 'bairro',
                    'cidade', 'tipos_evento', 'publico_alvo', 'valor_entrada', 
                    'descricao', 'banner', 'data_adicao')


class EventoView(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer
    http_method_names = ['get', 'post', 'put', 'delete']
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]  
    search_fields = ['nome', 'descricao']

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return super().get_serializer_class()
        return EventoSerializer

class TipoEventoView(viewsets.ModelViewSet):
    queryset = TipoEvento.objects.all()
    serializer_class = TipoEventoSerializer
    http_method_names = ['get', 'post', 'put', 'delete']
