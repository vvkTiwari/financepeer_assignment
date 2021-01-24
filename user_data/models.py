from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _


# Create your models here.


class UserData(models.Model):
    id = models.PositiveIntegerField(_("Id"), null=False, blank=False, primary_key=True)
    user = models.ForeignKey(User, related_name="userdata", null=False, blank=False, on_delete=models.CASCADE)
    title = models.CharField(_("Title"), max_length=255, null=True, blank=True)
    body = models.TextField(_("User Content"), blank=True)

