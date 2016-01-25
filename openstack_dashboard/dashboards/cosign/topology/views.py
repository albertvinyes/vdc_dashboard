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

from horizon import views
from django.shortcuts import render
from django.template import *
import uuid

class VirtualNode(object):
    def __init__(self, label, top, left):
        self.label = label
        self.top = top
        self.left = left
        self.identifier = str(uuid.uuid4())

class IndexView(views.APIView):
    # A very simple class-based view...
    template_name = 'cosign/topology/index.html'
    def get_data(self, request, context, *args, **kwargs):
        # Add data to the context here...
        #context = RequestContext(request)
        vnodes = []
        vnodes.append(VirtualNode("vnode1","50px","50px"))
        vnodes.append(VirtualNode("vnode2","200px","240px"))
        context["virtual_nodes"] = vnodes
        return context


def index(request):
    index = "index"
    return render(request, 'cosign/topology/index.html',context)
