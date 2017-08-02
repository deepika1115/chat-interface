#!/usr/bin/env python

import cgi
import webapp2
import json
import urllib2
import logging
import requests
from firebase import Firebase


class MainPage(webapp2.RequestHandler):
    
    def post(self):

        self.response.headers['Content-type'] = 'application/json'
        
        #getting data from api.ai
        logging.info(json.loads(self.request.body))
        data = json.loads(self.request.body)['result']['resolvedQuery']
        session_id = json.loads(self.request.body)['sessionId']
        
        #obj to send to slack 
        obj = {
        "text": '*SESSION ID:* ' + session_id +' ' + data
        }



        #sending ob to api.ai as response
        ob = {
        "speech": "sending to slack",
        "displayText": "sending to slack",
        "data": {},
        "contextOut": [],
        "source": "Deepika"
        }
        self.response.out.write(json.dumps(ob))
        
        #sending obj to slack
        req = urllib2.Request('https://hooks.slack.com/services/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')
        req.add_header('Content-Type', 'application/json')
        response = urllib2.urlopen(req, json.dumps(obj))

class RespPage(webapp2.RequestHandler):

    def post(self):

        #getting data from slack
        logging.info(self.request.body)
        slack_data = dict(x.split('=') for x in self.request.body.split('&'))
        logging.info(slack_data)
        txdata = slack_data['text'].replace("+"," ")
        logging.info(txdata)
        
        #sending data from slack to api.ai for faq or result text to firebase
        if "faq" in txdata:
            fdata = txdata.split("%3A")
            faq = fdata[1]
            faqans = fdata[2]
            logging.info(fdata)
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
                    
            req.add_header("Authorization", "Bearer aac6cb63592149359600bcd3ed954a9b")
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
            f = Firebase('https://chat-interface1.Firebaseio.com/chat-interface1')
            f.push({'session_id': session_id, 'message': msg})
            # result = Firebase.post('/messages', txdata, {'print': 'pretty'}, {'X_FANCY_HEADER': 'VERY FANCY'})

class site(webapp2.RequestHandler):
  def post(self):
  
    logging.info(self.request.body)
    # logging.info(self.request.url)
    
app = webapp2.WSGIApplication([
  ('/no', MainPage),
  ('/res',RespPage),
  ('/', site)
], debug=True)