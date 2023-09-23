from rest_framework.permissions import DjangoModelPermissions


class CustomDjangoModelPermissions(DjangoModelPermissions):

    def has_permission(self, request, view):
        if request.method in ['POST', 'PUT']:
            return request.user and request.user.is_authenticated
        return True