
from rest_framework import serializers

from .models import Misser


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


class MisserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Misser
        fields = ()

    def create(self, validated_data):
        return Misser.objects.create_with_ip(
            get_client_ip(self.context['request']))
