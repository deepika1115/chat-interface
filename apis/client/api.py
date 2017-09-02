import endpoints
from protorpc import remote

from google.appengine.ext import ndb
from apis.ndb_models import ChatClients

from .rpc import UrlReq, TokenResp
from apis import api_collection

# @endpoints.api(name ='clientHandle',
#                version = 'v1')
@api_collection.api_class(resource_name='client_handler')
class ClientHandle(remote.Service):
  @endpoints.method(UrlReq,
                    TokenResp,
                    name = "client_handle",
                    path = "apis/client/client_handle",
                    http_method = "POST")
  def client_handle(self, request):
    current_url = request.current_url
    project_key = request.project_key
    
    getdata = ChatClients()
    q = getdata.query(getdata.website_url == current_url).get()
    token = q.client_access_token
    return TokenResp(client_token = token)