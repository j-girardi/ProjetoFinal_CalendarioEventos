from django.db import models
from django.contrib.auth.models import AbstractUser

from CalendarioEventos.utils.utils import valida_cpf

class Usuario(AbstractUser):
    email = models.EmailField('email address', unique=True)
    cpf = models.CharField(max_length=14, null=True, blank=True, validators=[valida_cpf])
    data_nascimento = models.DateField(null=True, blank=True)
    telefone = models.CharField(max_length=15, null=True, blank=True)
    foto_perfil = models.ImageField(upload_to='images/usuarios_perfil', blank=True, null=True)

