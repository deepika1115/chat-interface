from protorpc import messages
from protorpc import remote

class ApiaiReq(messages.Message):
	apiai_data = messages.StringField(1, required = True)

class ApiaiResp(messages.Message):
	resp_data = messages.StringField(1)