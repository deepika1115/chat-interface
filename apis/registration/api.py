import endpoints
from protorpc import remote
from protorpc import message_types

from google.appengine.ext import ndb
from ndb_models import ChatClients
from .rpc import ClientDetail
from apis import api_collection

# @endpoints.api(name ='clientHandle',
#                version = 'v1')
@api_collection.api_class(resource_name='register_handler')
class RegisterHandle(remote.Service):
  @endpoints.method(ClientDetail,
                    message_types.VoidMessage,
                    name = "register_handle",
                    path = "apis/registration/register_handle",
                    http_method = "POST")
  def register_handle(self, request):
  	getdata = ChatClients()
  	getdata.website_name = request.website_name
    getdata.website_url = request.website_url
    getdata.client_access_token = request.client_token
    getdata.developer_access_token = request.developer_token
    getdata.slack_url = request.slack_url
    getdata.put()