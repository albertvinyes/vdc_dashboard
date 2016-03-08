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
import uuid
import json


class VirtualNode(object):
    def __init__(self, label, top, left):
        self.label = label
        self.top = top
        self.left = left
        self.identifier = str(uuid.uuid4())

class IndexView(views.APIView):
    template_name = 'cosign/topology/index.html'
    def get_data(self, request, context, *args, **kwargs):
        # get the vnode topology and it's topology
        vnodes = []
        vlinks = []
        # Gather our flavors
        try:
            flavors = api.nova.flavor_list(self.request)
            #Get the details of our flavors
            full_flavors = OrderedDict([(str(flavor.id), flavor)
                                       for flavor in flavors])
            flavors_info = {}
            for key in full_flavors:
                flavor = api.nova.flavor_get(self.request, key)
                flavors_info[key] = {"name": flavor.name,
                       "vcpu": flavor.vcpus,
                       "memory": flavor.ram,
                       "disk": flavor.disk,
                       "swap": flavor.swap,
                       "rxtx_factor": flavor.rxtx_factor,
                       "is_public": flavor.is_public}
        except Exception:
            flavors = []
            exceptions.handle(self.request, ignore=True)
        # Gather images
        try:
            images, more, prev = api.glance.image_list_detailed(self.request)
            full_images = OrderedDict([(str(image.id), image)
                                       for image in images])
            images_info = []
            for image in images:
                if (image.is_public): 
                    images_info.append({"name": image.name,
                                        "id": image.id});
        except Exception:
            images = []
            exceptions.handle(self.request, ignore=True)

        # populate the context send to the HTML template
        context["virtual_nodes"] = vnodes
        context["tenant_id"] = self.request.user.tenant_id
        context["flavors"] = flavors_info
        context["flavors_js"] = json.dumps(flavors_info)
        context["images"] = images_info
        context["images_js"] = json.dumps(images_info)
        print context["flavors"]
        print ".............................................::"
        if request.session.get("has_started_vdc", True):
            context["state"] = "initialized"
        else:
            context["state"] = "uninitialized"
        return context

def create_vdc(request):
    message = "VDC created"
    request.session["has_started_vdc"] = True
    return HttpResponse(message)

def clear_vdc(request):
    message = "Clearing VDC"
    return HttpResponse(message)

def save_request(request):
    topology = json.loads(request.body)
    message = "Topology Saved!"
    return HttpResponse(message)

def index(request):
    index = "index"
    return render(request, 'cosign/topology/index.html',context)
