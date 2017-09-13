
import endpoints
from protorpc import remote
from protorpc import messages
import logging

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
    logging.info("hello client_handle")
    logging.info('Inside Client Handle')
    logging.info(request)
    current_url = request.current_url
    logging.info(current_url)
    project_key = request.project_key
    logging.info(project_key)

    logging.info("hii")
    
    q = ChatClients().query(ChatClients.website_url == current_url).get()
    logging.info(q)
    token = q.client_access_token
    logging.info(token)
    return TokenResp(client_token = token)