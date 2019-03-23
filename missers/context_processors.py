from django.conf import settings

def analytics(request):
    return {
        'GTM_CONTAINER': settings.GTM_CONTAINER,
    }
