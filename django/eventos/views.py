from django.shortcuts import render
from rest_framework import serializers
from rest_framework import viewsets
from eventos.models import Evento, TipoEvento


class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ('id', 'nome', 'data', 'cep', 'rua', 'numero', 'bairro',
                    'cidade', 'display_tipos_evento', 'publico_alvo', 'valor_entrada', 
                    'descricao', 'banner', 'data_adicao')

class TipoEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEvento
        fields = ('id', 'nome')

class EventoView(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

class TipoEventoView(viewsets.ModelViewSet):
    queryset = TipoEvento.objects.all()
    serializer_class = TipoEventoSerializer
    http_method_names = ['get', 'post', 'put', 'delete']