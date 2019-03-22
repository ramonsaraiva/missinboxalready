from django.contrib import admin
from django.urls import path


from missers.views import MissersView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', MissersView.as_view(), name='missers'),
]
