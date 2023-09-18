from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=255)
    cpf = models.CharField(max_length=14)
    data_nascimento = models.DateField()
    email = models.EmailField(null=True, blank=True)
    telefone = models.SmallIntegerField()

