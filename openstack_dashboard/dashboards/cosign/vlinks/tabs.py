from django.utils.translation import ugettext_lazy as _

from horizon import exceptions
from horizon import tabs

from openstack_dashboard import api
from openstack_dashboard.dashboards.cosign.vlinks import tables


class VirtualLinksTab(tabs.TableTab):
    name = _("Virtual Links Tab")
    slug = "virtual_links_tab"
    table_classes = (tables.VirtualLinksTable,)
    template_name = ("horizon/common/_detail_table.html")
    preload = False

    def has_more_data(self, table):
        return self._has_more

    def get_instances_data(self):
        #TODO Update with proper virtual link table call
        try:
            marker = self.request.GET.get(
                        tables.VirtualLinksTable._meta.pagination_param, None)

            instances, self._has_more = api.nova.server_list(
                self.request,
                search_opts={'marker': marker, 'paginate': True})

            return instances
        except Exception:
            self._has_more = False
            error_message = _('Unable to get instances')
            exceptions.handle(self.request, error_message)

            return []

class VirtualLinksTabs(tabs.TabGroup):
    slug = "virtual_links_tabs"
    tabs = (VirtualLinksTab,)
    sticky = True
