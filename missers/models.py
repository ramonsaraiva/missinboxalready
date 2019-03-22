from model_utils.models import TimeStampedModel

from django.db import models


class Country(TimeStampedModel):
    name = models.CharField(unique=True, max_length=128)

    def __repr__(self) -> str:
        return f'<Country {self.name}>'

    def __str__(self) -> str:
        return self.name


class MisserManager(models.Manager):

    def create_with_ip(self, ip):
        # deal with geoip
        return None


class Misser(TimeStampedModel):
    ip = models.GenericIPAddressField()
    country = models.ForeignKey(Country, on_delete=models.PROTECT)

    objects = MisserManager()

    def __repr__(self) -> str:
        return f'<Misser from {self.country}>'

    def __str__(self) -> str:
        return self.country
