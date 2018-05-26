import tornado.web
import logging
import os
import dateparser

class MessagesController(tornado.web.RequestHandler):

    async def get(self):
        afterDate = dateparser.parse(self.get_argument("after", ""))
        messages = None
        
        # Check if a `after` arguments was given, if so, return only messages after that time
        # this is mainly for client polling
        if afterDate:
            cursor = self.settings["dbConnection"].messages.find({"date": {
                "$gt": afterDate
            }}).sort([("date",-1)])
            messages = await cursor.to_list(length=None)
        else:
            # If no `after` date was given, return a partial history of messages
            cursor = self.settings["dbConnection"].messages.find({}).sort([("date",-1)])
            messages = await cursor.to_list(length=self.settings["options"]["MAX_RESULTS"])
        
        self.finish({"messages": messages})
