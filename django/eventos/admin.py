from django.contrib import admin
from eventos.models import Evento, TipoEvento


@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'data', 'cep', 'rua', 'numero', 'bairro',
                    'cidade', 'display_tipos_evento', 'publico_alvo', 
                    'valor_entrada', 'descricao', 'banner', 'data_adicao',
                    'usuario'
                )
    
@admin.register(TipoEvento)
class TipoEventoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome')
