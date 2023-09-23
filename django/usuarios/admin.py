from django.contrib import admin

from usuarios.models import Usuario


@admin.register(Usuario)
class UsuarioView(admin.ModelAdmin):
    list_display = ('id', 'username', 'email')