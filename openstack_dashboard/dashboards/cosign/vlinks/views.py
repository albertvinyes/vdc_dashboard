from horizon import tabs

from openstack_dashboard.dashboards.cosign.vlinks \
    import tabs as mydashboard_tabs


class IndexView(tabs.TabbedTableView):
    tab_group_class = mydashboard_tabs.VirtualLinksTabs
    template_name = 'cosign/vlinks/index.html'

    def get_data(self, request, context, *args, **kwargs):
        # Add data to the context here...
        return context
