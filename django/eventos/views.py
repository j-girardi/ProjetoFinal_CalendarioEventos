from datetime import date
from django.shortcuts import render
from rest_framework import serializers
from rest_framework import viewsets
from usuarios.models import Usuario
from eventos.models import Evento, TipoEvento
from rest_framework import filters
from rest_framework.permissions import SAFE_METHODS
from rest_framework.parsers import MultiPartParser, FormParser
import pdb
import json

# from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend

class OrganizadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'first_name', 'last_name')

class TipoEventoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = TipoEvento
        fields = ('id', 'nome')

class EventoReadSerializer(serializers.ModelSerializer):
    banner = serializers.ImageField(max_length=None, use_url=True, required=False)
    usuario = OrganizadorSerializer(read_only=True)
    tipos_evento = TipoEventoSerializer(read_only=True, many=True)

    
    class Meta:
        model = Evento
        fields = ('id', 'nome', 'data', 'cep', 'rua', 'numero', 'bairro',
                    'cidade', 'tipos_evento', 'publico_alvo', 'valor_entrada', 
                    'descricao', 'data_adicao', 'banner', 'usuario')


class TipoEventoWriteSerializer(serializers.ListField):
    def to_internal_value(self, data):
        return json.loads(data[0])
    def to_representation(self, data):
            return None

class EventoWriteSerializer(serializers.ModelSerializer):
    # banner = serializers.ImageField(max_length=None, use_url=True, required=False)
    tipos_evento = TipoEventoWriteSerializer()
    

    class Meta:
        model = Evento
        fields = ('id', 'nome', 'data', 'cep', 'rua', 'numero', 'bairro',
                    'cidade', 'publico_alvo', 'valor_entrada', 
                    'descricao', 'data_adicao', 'banner', 'tipos_evento', 'usuario')
        
    def create(self, validated_data):
        # pdb.set_trace()
        return super().create(validated_data)
    #     tipos_evento_ids = validated_data.pop('tipos_evento', [])  # Extrai os tipos de evento
    #     evento = Evento.objects.create(**validated_data)

    #     logger.info('validated_data', validated_data)
    #     logger.info('tipos_evento_ids', tipos_evento_ids)

    #     # Processa os tipos de evento e associa ao evento criado
    #     for tipo_evento_id in tipos_evento_ids:
    #         tipo_evento = TipoEvento.objects.get(id=tipo_evento_id)
    #         evento.tipos_evento.add(tipo_evento)
    #     return evento




class EventoView(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoReadSerializer
    http_method_names = ['get', 'post', 'put', 'delete']
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]  
    search_fields = ['nome', 'descricao']


    def get_queryset(self):
        current_date = date.today()
        # Filtrar os eventos com datas maiores ou iguais à data atual
        return Evento.objects.filter(data__gte=current_date)

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return super().get_serializer_class()
        return EventoWriteSerializer


class TipoEventoView(viewsets.ModelViewSet):
    queryset = TipoEvento.objects.all()
    serializer_class = TipoEventoSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    
