import tornado.web
import logging
import os
import dateparser
from datetime import datetime
from bson import json_util

class MessagesController(tornado.web.RequestHandler):

    def get_database(self):
        return self.settings["dbConnection"]

    async def get(self):
        afterDate = dateparser.parse(self.get_argument("after", ""))
        messages = None

        # Check if a `after` arguments was given, if so, return only messages after that time
        # this is mainly for client polling
        if afterDate:
            cursor = self.get_database().messages.find({"date": {
                "$gt": afterDate
            }}).sort([("date",-1)])
            messages = await cursor.to_list(length=None)
        else:
            # If no `after` date was given, return a partial history of messages
            cursor = self.get_database().messages.find({}).sort([("date",-1)])
            messages = await cursor.to_list(length=self.settings["options"]["MAX_RESULTS"])

        # Serialize BSON to JSON format
        self.set_header('Content-Type', "application/json; charset=UTF-8")
        self.finish(json_util.dumps({"messages": messages}))

    async def post(self):
        # Parse message body
        data_json = tornado.escape.json_decode(self.request.body)
        content = data_json.get("content")
        user_name = data_json.get("userName")

        # Validate args
        if(not content):
            raise tornado.web.MissingArgumentError("content")
        
        if(not user_name):
            raise tornado.web.MissingArgumentError("userName")

        logging.info("Got a message from {0}".format(user_name))

        # Insert the message into our database
        await self.get_database().messages.insert_one({
            "userName": user_name,
            "content": content,
            "date": datetime.now()
        })

        self.set_status(201)