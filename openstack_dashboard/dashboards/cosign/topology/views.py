# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.
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

tenant_id = "null"

class VirtualNode(object):
    def __init__(self, label, top, left):
        self.label = label
        self.top = top
        self.left = left
        self.identifier = str(uuid.uuid4())

class IndexView(views.APIView):
    template_name = 'cosign/topology/index.html'
    def get_data(self, request, context, *args, **kwargs):
        # get the vdc
        global tenant_id
        tenant_id = self.request.user.tenant_id
        vnodes = []
        vlinks = []
        r = requests.get("http://127.0.0.1:12119/orchestrator/algorithms/vdc/?tenantID="+tenant_id, auth=HTTPBasicAuth('admin', 'password'))
        print ".................................................................................."
        print r.text
        vdc = r.text
        flavors_info = {}
        images_info = []
        # Gather our flavors
        try:
            flavors = api.nova.flavor_list(self.request)
            #Get the details of our flavors
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
        except Exception:
            flavors = []
            exceptions.handle(self.request, ignore=True)
        # Gather images
        try:
            images, more, prev = api.glance.image_list_detailed(self.request)
            full_images = OrderedDict([(str(image.id), image)
                                       for image in images])
            for image in images:
                if (image.is_public): 
                    images_info.append({"name": image.name,
                                        "id": image.id});
        except Exception:
            images = []
            exceptions.handle(self.request, ignore=True)

        # populate the context sent to the HTML template
        context["vdc"] = json.dumps(vdc)
        context["tenant_id"] = tenant_id
        context["flavors"] = flavors_info
        context["flavors_js"] = json.dumps(flavors_info)
        context["images"] = images_info
        context["images_js"] = json.dumps(images_info)
        context["state"] = "initialized"
        return context


def submit_vdc(request):
    vdc = request.POST['json']
    headers = {'content-type': 'application/json'}
    r = requests.post("http://127.0.0.1:12119/orchestrator/algorithms/vdc/", vdc, auth=HTTPBasicAuth('admin', 'password'), headers=headers)
    return HttpResponse(json.dumps(r.text))

def delete_vdc(request):
    r = requests.delete("http://127.0.0.1:12119/orchestrator/algorithms/vdc/?tenantID="+tenant_id, auth=HTTPBasicAuth('admin', 'password'))
    return HttpResponse(json.dumps(r.text))

def get_vdc(request):
    r = requests.get("http://127.0.0.1:12119/orchestrator/algorithms/vdc/?tenantID="+tenant_id, auth=HTTPBasicAuth('admin', 'password'))
    return HttpResponse(json.dumps(r.text))


def index(request):
    index = "index"
    return render(request, 'cosign/topology/index.html',context)
