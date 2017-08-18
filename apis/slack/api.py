import endpoints
from protorpc import remote
from protorpc import message_types

from google.appengine.ext import ndb
from .rpc import slackData
from apis import api_collection

# @endpoints.api(name ='clientHandle',
#                version = 'v1')
@api_collection.api_class(resource_name='slack_handler')
class SlackHandle(remote.Service):
  @endpoints.method(SlackData,
                    message_types.VoidMessage,
                    name = "slack_handle",
                    path = "apis/slack/slack_handle",
                    http_method = "POST")
  def slack_handle(self, request):
    request.SlackData()