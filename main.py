#!/usr/bin/env python

# slack url = 'https://hooks.slack.com/services/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'
# bot token = aac6cb63592149359600bcd3ed954a9b

import cgi
import webapp2
import json
import urllib2
import urllib
import logging
import requests
import model
from firebase.firebase import FirebaseApplication

# put data in ndb
class Datastorage(webapp2.RequestHandler):
  def post(self):
    logging.info(self.request.body)
    logging.info(json.loads(self.request.body))
    d=json.loads(self.request.body)
    logging.info(d)
    getdata = model.ChatClients()

    getdata.website_name=d['websiteName']
    getdata.website_url=d['websiteUrl']
    getdata.client_access_token=d['clientToken']
    getdata.developer_access_token=d['developerToken']
    getdata.slack_url=d['slackUrl']
    
    z_key=getdata.put()
    

class CurrentHandler(webapp2.RequestHandler):
  def post(self):
    logging.info(self.request.body)
    if 'url' in self.request.body:
      currentUrl = json.loads(self.request.body)['url']
      logging.info(currentUrl)
      q = model.ChatClients().query(model.ChatClients.website_url == currentUrl).get()
      token = q.client_access_token
      logging.info(token)
      obj = {
        "token" : token
      }
      self.response.write(json.dumps(obj))


class ApiHandler(webapp2.RequestHandler):
    
  def post(self):
    
    # global currentUrl
    self.response.headers['Content-type'] = 'application/json'
      
    #getting currentUrl from front end 
    logging.info(json.loads(self.request.body))
    # if 'url' in self.request.body:
    #   currentUrl = json.loads(self.request.body)['url']
    #   logging.info(currentUrl)
    # q = [p.to_dict() for p in model.ChatClients().query(model.ChatClients.website_url == currentUrl).fetch()]
    # logging.info(q)
    # slackUrl = q[0]['slack_url']
    # logging.info(slackUrl)
    
    #getting data from api.ai
    req = json.loads(self.request.body)
    
    data = req['result']['resolvedQuery']
    logging.info(data)
    session_id = req['sessionId']
    logging.info(session_id)
    token = req['result']['contexts'][0]['parameters']['token']
    logging.info(token)
    q = model.ChatClients().query(model.ChatClients.client_access_token == token).get()
    slackUrl = q.slack_url
    
    #sending ob to api.ai as response
    ob = {
    "speech": "sending to slack",
    "displayText": "sending to slack",
    "data": {},
    "contextOut": [],
    "source": "Deepika"
    }
    self.response.out.write(json.dumps(ob))
    
    #obj to send to slack 
    obj = {
    "text": '*SESSION ID:* ' + session_id +' ' + data
    }

    #sending obj to slack
    req = urllib2.Request(slackUrl)
    req.add_header('Content-Type', 'application/json')
    response = urllib2.urlopen(req, json.dumps(obj))
  


class SlackHandler(webapp2.RequestHandler):

  def post(self):
   
    #getting currentUrl from front end
    # if 'url' in self.request.body:
    #   global currentUrl
    #   currentUrl = json.loads(self.request.body)['url']
    #   logging.info(currentUrl)
    # q = [p.to_dict() for p in model.ChatClients().query(model.ChatClients.website_url == currentUrl).fetch()]
    # logging.info(q)
    # botToken = q[0]['bot_token']
    # logging.info(botToken)

    #getting data from slack
    slack_data = dict(x.split('=') for x in self.request.body.split('&'))
    logging.info(slack_data)
    txdata = slack_data['text'].replace("+"," ")
    # txdata = urllib.unquote(slack_data['text']).decode()
    logging.info(txdata)
    
    #sending data from slack to api.ai for faq or result text to firebase
    if "faq" in txdata:
      fdata = txdata.split("%3A")
      logging.info(fdata)
      fdataq = fdata[0].split("faq")
      logging.info(fdataq)
      faq = fdataq[1]
      faqans = fdata[1]
      
      logging.info(faq)
      logging.info(faqans)


      obfaq = {
                "name": faq,
                "auto": "true",
                "contexts": [],
                "templates": [],
                "userSays": [
                              {
                                "data": [
                                          {
                                            "text": faq
                                          },
                                         ],
                                "isTemplate": "false",
                                "count": 0
                              }
                        
                            ],
                "responses": [
                               {
                                 "resetContexts": "false",
                                 "affectedContexts": [],
                                 "parameters": [],
                                 "speech": faqans
                               }
                             ],
                "priority": 500000
              }
  
      req = urllib2.Request('https://api.api.ai/v1/intents?v=20150910')
              
      req.add_header("Authorization", "Bearer" + botToken)
      logging.info(botToken)
      req.add_header("charset","utf-8")
      req.add_header("Content-Type", "application/json")
      response = urllib2.urlopen(req, json.dumps(obfaq))
      logging.info(response)
      

    else:
    
      rdata = txdata.split('%3A')
      logging.info(rdata)
      prevSession = rdata[1].replace("%40","@").split("%7C")
      session_id = prevSession[0]
      msg = rdata[2]
      
      logging.info(slack_data)
      logging.info(session_id)
      logging.info(msg)
      f = FirebaseApplication('https://chat-interface1.Firebaseio.com', None)
      f.post('/chat-interface1', {'session_id': session_id, 'message': msg})
      

    
app = webapp2.WSGIApplication([
  ('/update/', Datastorage),
  ('/apidata', ApiHandler),
  ('/slackdata',SlackHandler),
  ('/current',CurrentHandler)
], debug=True)