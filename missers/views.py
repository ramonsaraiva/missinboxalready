from rest_framework import (
    mixins,
    viewsets,
)
from rest_framework.decorators import action
from rest_framework.response import Response

from django.db.models import Count
from django.views.generic import ListView

from .models import Misser
from .serializers import MisserSerializer


class MissersView(ListView):
    model = Misser
    template_name = 'missers/missers.html'

    def identify_others(self, countries, total, cap=0.05):
        for name, count in countries.items():
            if (count / total) < cap or name == 'Undefined':
                yield (name, count)

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)

        countries = self.get_queryset().values(
            'country', 'country__name'
        ).annotate(count=Count('country')).order_by('-count')

        countries = {
            country['country__name']: country['count']
            for country in countries
        }
        total = len(self.object_list) - countries['Undefined']

        others = list(self.identify_others(countries, total))
        countries['Others'] = 0
        for name, count in others:
            del countries[name]
            countries['Others'] += count

        context['countries'] = countries
        return context


class MissersViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Misser.objects.all()
    serializer_class = MisserSerializer

    @action(detail=False)
    def count(self, request):
        return Response({'count': self.get_queryset().count()})
