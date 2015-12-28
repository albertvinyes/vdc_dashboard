from django.utils.translation import ugettext_lazy as _

from horizon import exceptions
from horizon import tabs

from openstack_dashboard import api
from openstack_dashboard.dashboards.cosign.vnodes import tables


class VirtualNodesTab(tabs.TableTab):
    name = _("Virtual Nodes Tab")
    slug = "virtual_nodes_tab"
    table_classes = (tables.VirtualNodesTable,)
    template_name = ("horizon/common/_detail_table.html")
    preload = False

    def has_more_data(self, table):
        return self._has_more

    def get_virtualnodes_data(self):
        #TODO update with new virtual node call
        try:
            marker = self.request.GET.get(
                        tables.VirtualNodesTable._meta.pagination_param, None)

            instances, self._has_more = api.nova.server_list(
                self.request,
                search_opts={'marker': marker, 'paginate': True})

            return instances
        except Exception:
            self._has_more = False
            error_message = _('Unable to get instances')
            exceptions.handle(self.request, error_message)

            return []

class VirtualNodesTabs(tabs.TabGroup):
    slug = "mypanel_tabs"
    tabs = (VirtualNodesTab,)
    sticky = True
