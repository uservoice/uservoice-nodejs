UserVoice Node.js library for API connections
============================================

This library is designed to allow easy access to the UserVoice API for server side Node.js applications.

Current Status:
* Direct Client Key/Secret API calls can be made through the UserVoice Client
* Some helper functions have been exposed via UserVoice.Client.ticketService, ticketNoteService, assetService, etc

Installation
============

This SDK can be installed via NPM

```sh
npm i --save uservoice-nodejs
```

Examples
========

Direct Requests Against API
---------------
Direct requests can be made directly against the UserVoice client object using `get`, `post`, `put`, and `delete`.

Some API endpoints can be used without authentication, but most will require either owner-level or user-level authentication.

```javascript
var UserVoice = require('uservoice-nodejs');
var client = new UserVoice.Client({
  subdomain: 'subdomain',
  apiKey: 'clientKey',
  apiSecret: 'clientSecret'
});

// Login as owner
client.loginAsOwner()
  .then(function(ownerClient) {
    var ticketId = 1;
    ownerClient.create('tickets' + ticketId + '/notes.json', {
      note: {
        created_at: new Date(2015, 1, 1, 0, 0, 0, 0),
        text: 'Some text',
        updated_at: new Date(2015, 1, 1, 0, 0, 0, 0)
      }
    });
  });

// Gets a list of all tickets
client.get('tickets.json')
    .then(function(tickets) {
      console.log(tickets);
    })
    .catch(function(error) {
      //error handling
    });
}

// Requests can also be made against the V2 API
var v2Client = new UserVoice.ClientV2({
  clientId: 'apiKey',
  subdomain: 'subdomain'
});

var apiSecret = 'apiSecret';
v2Client.loginAsOwner(apiSecret)
  .then(function(ownerClient) {
    ownerClient.get('admin/forums')
      .then(function(data) {
        console.log(data;
      });
  });

var email = 'email';
var password = 'password';
v2Client.loginAsUser(email, password)
  .then(function(userClient) {
    // Make calls against the API
  });

```

API Abstractions
----------------
Some functions of the UserVoice API have been grouped into Objects and Functions for easier use.
These functions have been designed to return promises, making them more composable in complex workflows.

```javascript
var UserVoice = require('uservoice-nodejs');
var client = new UserVoice.Client({
  subdomain: 'subdomain',
  apiKey: 'clientKey',
  apiSecret: 'clientSecret'
});

client.ticketService.list()
    .then(function(data){
      data.response;
      data.tickets;
    })
    .catch(function(error){
      //error handling
    });

// Against V2 API
var clientv2 = new UserVoice.ClientV2({
  subdomain: 'subdomain',
  apiKey: 'apiKey'
});

clientv2.loginAsOwner()
  .then(function(ownerClient) {
    ownerClient.forumService.list()
      .done(function(data) {
        console.log(data);
      });
  });

```

Contributing/Dev Environment
============

Getting Started
-----
- npm install

Npm Tasks
-----
- No global package installations should be necessary
- npm start: start TypeScript compiler with watch and incremental compilation
- npm run build: compile TypeScript, linter, and generator distributable type definitions
- npm test: run mocha tests
- npm run lint: run tslint