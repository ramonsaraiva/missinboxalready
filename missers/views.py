from django.views.generic import ListView

from .models import Misser


class MissersView(ListView):
    model = Misser
    template_name = 'missers/missers.html'
