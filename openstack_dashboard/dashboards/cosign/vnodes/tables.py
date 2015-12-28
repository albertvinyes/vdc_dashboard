from django.utils.translation import ugettext_lazy as _

from horizon import tables

class StringFilter(tables.FilterAction):
    name = "stringfilter"

class VirtualNodesTable(tables.DataTable):
    #TODO Update with new Virtual Nodes Columns
    name = tables.Column("name", verbose_name=_("Name"))
    status = tables.Column("status", verbose_name=_("Status"))
    zone = tables.Column('availability_zone',
                          verbose_name=_("Availability Zone"))
    image_name = tables.Column('image_name', verbose_name=_("Image Name"))
    # ---
    class Meta:
        name = "virtualnodes"
        verbose_name = _("Virtual Nodes")
        table_actions = (StringFilter,)
