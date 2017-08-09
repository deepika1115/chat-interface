from google.appengine.ext import ndb

class chatClients(ndb.Model):

  website_name=ndb.StringProperty()
  website_url=ndb.StringProperty()
  slack_url=ndb.StringProperty()
  bot_token=ndb.StringProperty()