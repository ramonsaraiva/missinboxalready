from rest_framework.routers import DefaultRouter

from django.contrib import admin
from django.urls import (
    path,
    include,
)

from missers.views import (
    MissersView,
    MissersViewSet,
)


router = DefaultRouter()
router.register(r'missers', MissersViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', MissersView.as_view(), name='missers'),
    path('api/v1/', include(router.urls)),
]
