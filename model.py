from google.appengine.ext import ndb

class ChatClients(ndb.Model):

  website_name = ndb.StringProperty()
  website_url = ndb.StringProperty()
  client_access_token = ndb.StringProperty()
  developer_access_token = ndb.StringProperty()
  slack_url = ndb.StringProperty()
  