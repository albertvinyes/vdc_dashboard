from horizon import tabs

from openstack_dashboard.dashboards.cosign.vnodes \
    import tabs as mydashboard_tabs


class IndexView(tabs.TabbedTableView):
    tab_group_class = mydashboard_tabs.VirtualNodesTabs
    template_name = 'cosign/vnodes/index.html'

    def get_data(self, request, context, *args, **kwargs):
        # Add data to the context here...
        return context
