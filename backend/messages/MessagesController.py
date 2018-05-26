import tornado.web

class MessagesController(tornado.web.RequestHandler):
  def initialize(self, dbConnection):
    self.dbConnection = dbConnection

  def get(self)