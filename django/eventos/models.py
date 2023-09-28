from django.db import models
from usuarios.models import Usuario

class TipoEvento(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome
    
class Evento(models.Model): 
    nome = models.CharField(max_length=255)
    data = models.DateField()
    cep = models.CharField(max_length=8)
    rua = models.CharField(max_length=255, null=True, blank=True)
    numero = models.IntegerField(null=True, blank=True)
    bairro = models.CharField(max_length=255, null=True, blank=True)
    cidade = models.CharField(max_length=255, default='Pato Branco')
    publico_alvo = models.CharField(max_length=255, default="Todos os publicos")
    valor_entrada = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0)
    descricao = models.TextField(default='', null=True, blank=True)
    banner = models.ImageField(upload_to='images/eventos', blank=True, null=True)
    data_adicao = models.DateTimeField(auto_now_add=True) 
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='eventos', null=True, blank=True)
    tipos_evento = models.ManyToManyField(TipoEvento, null=True, blank=True)
    
    def __str__(self) -> str:
        return self.nome
    
    @property
    def display_tipos_evento(self):
        return ", ".join([tipo.nome for tipo in self.tipos_evento.all()])



