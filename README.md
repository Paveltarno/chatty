Chatty
===
## Description  
Chatty is an example application. The backend is written with Tornado and the frontend uses React.js


### Prerequisites
- mongodb > 3.6
- python > 3.6.5
- node > 9.1

### Running in develop
- From project root run: `pip install -r requirements.txt && cd ./client && npm install && cd ../`
- Run the DB, server and client using `honcho start`
- Open `http://localhost:5200/` in your browser

### Running in production
- From project root run: `pip install -r requirements.txt && cd ./client && npm install && cd ../`
- Run `npm run build` from the `client` directory to create the production build.
- Run the db and server together using `honcho start mongo server`

### Configuration
___All configuration values have defaults so setting them is not strictly necessary, however they can be changed by setting environemnt variables or if using `honcho`, including them in a `.env` file inside the root dir___:
- `SERVER_PORT` - _(if changed, make sure to change the `proxy` field inside `client/package.json`)_
- `ADDRESS`
- `MAX_RESULTS` - _Maximum message results to return from the server without the client specifying a time window_
- `MONGO_URL`
- `DB_NAME`
- `DEBUG` - _Run Tornado in debug mode_

### Known design issues  
As this is an example app some issues were not taken fully care of:
- Short polling is used by the clients to stay up to date with latest messages. Web sockets or long polling would be better but would require longer development time.
- User name is not tested for uniqueness 