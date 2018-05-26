import tornado.web
import logging
import os
import dateparser

MAX_RESULTS = 35

class MessagesController(tornado.web.RequestHandler):

  def initialize(self, dbConnection, maxConnections):
    self.dbConnection = dbConnection

  # async def get(self):
  #   afterDate = dateparser.parse(self.get_argument("after", ""))
  #   messages

  #   if afterDate:
  #     # Check if a `after` arguments was given, if so, return only messages after that time
  #     # this is mainly for client polling
  #     query = {
  #       date: {
  #         "$gt": afterDate
  #       }
  #     }
      
  #   else
  #     # If no `after` date was given, return a partial history of messages
  #     query = {
        
  #     }




    
