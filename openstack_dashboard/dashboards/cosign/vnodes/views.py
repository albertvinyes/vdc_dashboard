from collections import OrderedDict
from horizon import views
from openstack_dashboard import api
from django.shortcuts import render
from django.template import *
from django.http import HttpResponse
from keystoneclient.v3 import client
from horizon import exceptions
import requests
from requests.auth import HTTPBasicAuth
import uuid
import json



class IndexView(views.APIView):
    template_name = 'cosign/vnodes/index.html'

    @staticmethod
    def is_json(myjson):
        try:
            json_object = json.loads(myjson)
        except ValueError, e:
            return False
        return True

    def get_data(self, request, context, *args, **kwargs):
        # Add data to the context here...
        tenant_id = self.request.user.tenant_id
        r = requests.get("http://127.0.0.1:12119/orchestrator/algorithms/vdc/?tenantID="+tenant_id, auth=HTTPBasicAuth('admin', 'password'))
        if self.is_json(r.text):
            vnodes = json.loads(r.text)
            vnodes = vnodes['vnodes']
            # Gather our flavors
            try:
                flavors_info = {}
                flavors = api.nova.flavor_list(self.request)
                full_flavors = OrderedDict([(str(flavor.id), flavor)
                                           for flavor in flavors])
                for key in full_flavors:
                    flavor = api.nova.flavor_get(self.request, key)
                    eph = getattr(flavor, 'OS-FLV-EXT-DATA:ephemeral')
                    flavors_info[key] = {"name": flavor.name,
                           "vcpu": flavor.vcpus,
                           "memory": flavor.ram,
                           "disk": flavor.disk,
                           "swap": flavor.swap,
                           "rxtx_factor": flavor.rxtx_factor,
                           "ephemeral": eph,
                           "is_public": flavor.is_public}
                print flavors_info
                for node in vnodes:
                    vcpus = ram = disk = 0
                    for vm in node['vms']:
                        f_id = vm['flavorID']
                        if f_id in flavors_info:
                            vcpus += flavors_info[f_id]['vcpu']
                            ram += flavors_info[f_id]['memory']
                            disk += flavors_info[f_id]['disk']
                        else:
                            raise "patata"    
                    node['vcpus'], node['total_disk'] = vcpus, str(disk) + " GB"
                    node['total_ram'] = str(ram) + " MB" if ram<1024 else str(int(ram/1024)) + " GB"
            except Exception:
                flavors = []
                exceptions.handle(self.request, ignore=True)
            context["virtual_nodes"] = vnodes
        return context
