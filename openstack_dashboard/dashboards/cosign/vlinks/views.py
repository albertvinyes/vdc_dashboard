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
    template_name = 'cosign/vlinks/index.html'
    
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
            vdc = json.loads(r.text)
            vlinks = vdc['vlinks']
            vnodes = vdc['vnodes']
            for link in vlinks:
                source_name = ""
                destination_name = ""
                for node in vnodes:
                    if node['id'] == link['to']:
                        destination_name = node['label']
                    if node['id'] == link['from']:
                        source_name = node['label']
                link["from_name"] = source_name
                link["to_name"] = destination_name
            context['virtual_links'] = vlinks
        return context
