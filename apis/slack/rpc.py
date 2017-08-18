from protorpc import messages
from protorpc import remote

class SlackData(messages.Message):
	slack_data = messages.StringField(1)
