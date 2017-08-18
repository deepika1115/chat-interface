import endpoints
# from apis.client.api import ClientHandle
from apis import api_collection
init = endpoints.api_server([api_collection])