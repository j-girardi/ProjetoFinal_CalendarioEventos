import django_filters
from .models import Evento

class EventoFilter(django_filters.FilterSet):
    start_date = django_filters.DateFilter(field_name="data", lookup_expr="gte")
    end_date = django_filters.DateFilter(field_name="data", lookup_expr="lte")

    class Meta:
        model = Evento
        fields = ["start_date", "end_date"]


class TipoEventoFilter(django_filters.FilterSet):
    tipo_evento = django_filters.CharFilter(field_name='nome', lookup_expr='icontains')

    class Meta:
        model = Evento
        fields = ['nome']