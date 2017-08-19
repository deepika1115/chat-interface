from protorpc import messages

class ClientDetail(messages.Message):
  website_name = messages.StringField(1, required = True)
  website_url = messages.StringField(2, required = True)
  client_token = messages.StringField(3, required = True)
  developer_token = messages.StringField(4, required = True)
  slack_url = messages.StringField(5, required = True)


