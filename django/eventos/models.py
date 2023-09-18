from django.db import models


class TipoEvento(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome
    
class Evento(models.Model): 
    nome = models.CharField(max_length=255)
    data = models.DateField()
    cep = models.CharField(max_length=8)
    rua = models.CharField(max_length=255, null=True)
    numero = models.IntegerField(null=True)
    bairro = models.CharField(max_length=255, null=True)
    cidade = models.CharField(max_length=255, default='Pato Branco')
    publico_alvo = models.CharField(max_length=255, default="Todos os publicos")
    tipos_evento = models.ManyToManyField(TipoEvento, null=False)
    valor_entrada = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    descricao = models.TextField()
    banner = models.ImageField(upload_to='images/eventos', blank=True, null=True, default='https://shorturl.at/iuTY8')
    data_adicao = models.DateTimeField(auto_now_add=True) 
    
    def __str__(self) -> str:
        return self.nome
    
    @property
    def display_tipos_evento(self):
        return ", ".join([tipo.nome for tipo in self.tipos_evento.all()])



