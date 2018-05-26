from tornado.options import define, options
from tornado import ioloop, web, locks
import motor.motor_tornado
import os
import logging
import sys
import signal
from messages.backend.messages_controller import MessagesController

class Server():
    async def start(self):
        # Initialize options from env vars or defaults
        options = self.initOptions()
        mongoClient = motor.motor_tornado.MotorClient(options["MONGO_URL"])
        dbConnection = mongoClient[options["DB_NAME"]]
        app = web.Application(
            [
                ("/messages", MessagesController),
            ],
            dbConnection=dbConnection, 
            options=options,
            debug=options["DEBUG"],
        )
        self.server = app.listen(options["SERVER_PORT"], options["ADDRESS"])
        logging.info("Server started on {0}:{1}".format(options["ADDRESS"], options["SERVER_PORT"]))
        shutdown_event = locks.Event()
        await shutdown_event.wait()

    def initOptions(self):
        return {
            "SERVER_PORT": int(os.getenv("SERVER_PORT", 3000)),
            "ADDRESS": os.getenv("SERVER_ADDRESS", "localhost"),
            "MAX_RESULTS": int(os.getenv("MAX_RESULTS", 25)),
            "MONGO_URL": os.getenv("MONGO_URL", "mongodb://localhost:27017"),
            "DB_NAME": os.getenv("DB_NAME", "chatty"),
            "DEBUG": os.getenv("DEBUG", "true")
        }

if __name__ == "__main__":
    logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
    chatServer = Server()
    ioloop.IOLoop.current().run_sync(chatServer.start)
