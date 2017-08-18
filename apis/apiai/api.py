import endpoints
from protorpc import remote

from google.appengine.ext import ndb
from .rpc import ApiaiReq, ApiaiResp
from apis import api_collection

# @endpoints.api(name ='clientHandle',
#                version = 'v1')
@api_collection.api_class(resource_name='apiai_handler')
class ApiaiHandle(remote.Service):
  @endpoints.method(ApiaiReq,
                    ApiaiResp,
                    name = "apiai_handle",
                    path = "apis/apiai/apiai_handle",
                    http_method = "POST")
  def apiai_handle(self, request):

    return ApiaiResp(resp_data = 'deepika123')