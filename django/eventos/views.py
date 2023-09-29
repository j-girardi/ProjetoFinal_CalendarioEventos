from eventos.filters import EventoFilter, TipoEventoFilter
from django.shortcuts import render
from rest_framework import serializers, viewsets, filters, pagination
from rest_framework.permissions import SAFE_METHODS
from django_filters.rest_framework import DjangoFilterBackend
from datetime import date
import json
from usuarios.models import Usuario
from eventos.models import Evento, TipoEvento


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
        return super().create(validated_data)

class CustomPaginator(pagination.PageNumberPagination):
    page_size = 10  # Número de itens por página
    page_size_query_param = 'page_size'  # Parâmetro opcional para definir o tamanho da página
    max_page_size = 100  # Tamanho máximo da página
    last_page_strings = ('last',)  # Texto para o último botão de página


class EventoView(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoReadSerializer
    http_method_names = ['get', 'post', 'put', 'delete']
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter,]  
    ordering = ['data']
    search_fields = ['nome', 'descricao']
    pagination_class = CustomPaginator
    filterset_class = EventoFilter

    filterset_fields = {
        'tipos_evento__nome': ['exact',' icontains']
    }

    def get_queryset(self):
        
        queryset = super().get_queryset()
        start_date = self.request.query_params.get("start_date")
        end_date = self.request.query_params.get("end_date")

        if start_date and end_date:
            queryset = queryset.filter(data__range=[start_date, end_date])

        return queryset
        # Filtrar os eventos com datas maiores ou iguais à data atual
        # current_date = date.today()
        # return Evento.objects.filter(data__gte=current_date)
        queryset = super().get_queryset()
        start_date = self.request.query_params.get("start_date")
        end_date = self.request.query_params.get("end_date")

        if start_date and end_date:
            queryset = queryset.filter(data__range=[start_date, end_date])
        return queryset


    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return super().get_serializer_class()
        return EventoWriteSerializer


class TipoEventoView(viewsets.ModelViewSet):
    queryset = TipoEvento.objects.all()
    serializer_class = TipoEventoSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    
