from protorpc import messages
from protorpc import remote

class ClientDetail(messages.Message):
  website_name = StringField(1, required = True)
  website_url = StringField(2, required = True)
  client_token = StringField(3, required = True)
  developer_token = StringField(4, required = True)
  slack_url = StringField(5, required = True)


