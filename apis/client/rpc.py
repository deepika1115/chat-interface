from protorpc import messages

class UrlReq(messages.Message):
	current_url = messages.StringField(1, required = True)
	project_key = messages.StringField(2, required = True)

class TokenResp(messages.Message):
	client_token = messages.StringField(1)



