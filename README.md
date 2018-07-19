# TODO Chatbot Server for Dialogflow

This is a server that contains endpoints for the CRUD functions of TODO entries. It serves as the back-end server for the Facebook-integrated Dialogflow bot.

## Requirements

* [Node JS](https://nodejs.org/)
* [SQLite3](https://www.sqlite.org/)

## Setup

1. Clone repository

```bash
$ git clone https://github.com/Brixjohn/todo-project-df
$ cd todo-project-df
```

2. Install all necessary packages

```bash
$ npm install
```

3. Start the server

```bash
$ npm run dev
```

The server will be accessible through port 8080.

## Implementation

The TODO entity has id, priority, subject, and content attributes. For the Dialogflow implementation, each of the functions has different parameters.

Aside from the TODO webhook for Dialogflow, the server also contains an endpoint that utilizes Facebook Messenger's Send API to send messages to a specific Facebook user. Note: The [Page Access Token](https://developers.facebook.com/docs/pages/access-tokens#page-access-tokens) for the endpoint should be changed in case the server will be used for another Facebook page. The user also needs to provide the [Page-scoped ID](https://developers.facebook.com/docs/messenger-platform/identity/id-matching) as a query for the POST request.
