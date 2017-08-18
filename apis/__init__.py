import endpoints
api_collection = endpoints.api(name='chat-interface', version='v1.0')
from apis.apiai.api import ApiaiHandle
from apis.client.api import ClientHandle
from apis.slack.api import SlackHandle


