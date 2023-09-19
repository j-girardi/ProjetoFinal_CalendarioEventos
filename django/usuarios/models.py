from django.db import models
from django.contrib.auth.models import AbstractUser

from CalendarioEventos.utils.utils import valida_cpf

class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14, null=True, blank=True, validators=[valida_cpf])
    data_nascimento = models.DateField(null=True, blank=True)
    email = models.EmailField(default='')
    telefone = models.CharField(max_length=15, null=True, blank=True)
    foto_perfil = models.ImageField(upload_to='images/usuarios_perfil', blank=True, null=True)
