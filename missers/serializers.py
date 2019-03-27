
from rest_framework import serializers

from .models import (
    Blacklisted,
    Misser,
)


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

    def validate(self, data):
        data['ip'] = get_client_ip(self.context['request'])
        if Blacklisted.objects.filter(ip=data['ip']).exists():
            raise serializers.ValidationError('Not you, sir.')
        return data

    def create(self, validated_data):
        return Misser.objects.create_with_ip(validated_data['ip'])
