from django.utils.translation import ugettext_lazy as _

from horizon import tables


class StringFilter(tables.FilterAction):
    name = "stringfilter"


class VirtualLinksTable(tables.DataTable):
    #TODO Update with the new virtual link columns 
    name = tables.Column('name', \
                         verbose_name=_("Name"))
    status = tables.Column('status', \
                           verbose_name=_("Status"))
    zone = tables.Column('availability_zone', \
                         verbose_name=_("Availability Zone"))
    image_name = tables.Column('image_name', \
                               verbose_name=_("Image Name"))

    class Meta:
        name = "instances"
        verbose_name = _("Instances")
        table_actions = (StringFilter,)
