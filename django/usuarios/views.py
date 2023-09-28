from rest_framework import serializers
from rest_framework import viewsets
from rest_framework.permissions import SAFE_METHODS
from usuarios.models import Usuario


class UsuarioWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        exclude = [
            "password",
            "is_superuser",
            "is_staff",
            "is_active",
            "user_permissions",
            "groups",
            "foto_perfil"
        ]
        read_only_fields = [
            "date_joined",
            "last_login",
        ]

class UsuarioReadSerializer(serializers.ModelSerializer):
    groups = serializers.SerializerMethodField()
    user_permissions = serializers.SerializerMethodField()
    
    class Meta:
        model = Usuario
        exclude = [
            'password',
            'is_superuser',
            'is_staff',
            'foto_perfil'
        ]
    
    def get_groups(self, instance):
        group_names = []
        for group in instance.groups.all():
            group_names.append(group.name)
        return group_names
    
    def get_user_permissions(self, instance):
        perms_names = []
        for perm in instance.user_permissions.all():
            perms_names.append(perm.codename)
        return perms_names

class UsuarioView(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioReadSerializer
    http_method_names = ["get", "post", "put", "delete"]

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return super().get_serializer_class()
        return UsuarioWriteSerializer