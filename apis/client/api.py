import endpoints
from protorpc import remote

from google.appengine.ext import ndb
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

    return TokenResp(client_token = 'deepika')