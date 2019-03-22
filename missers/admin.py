from django.contrib import admin

from .models import (
    Country,
    Misser,
)


admin.site.register(Country)
admin.site.register(Misser)
