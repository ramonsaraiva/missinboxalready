from django.contrib import admin

from .models import (
    Blacklisted,
    Country,
    Misser,
)


admin.site.register(Country)
admin.site.register(Misser)
admin.site.register(Blacklisted)
