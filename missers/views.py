from rest_framework import (
    mixins,
    viewsets,
)
from rest_framework.decorators import action
from rest_framework.response import Response

from django.views.generic import ListView

from .models import Misser
from .serializers import MisserSerializer


class MissersView(ListView):
    model = Misser
    template_name = 'missers/missers.html'


class MissersViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Misser.objects.all()
    serializer_class = MisserSerializer

    @action(detail=False)
    def count(self, request):
        return Response({'count': self.get_queryset().count()})
