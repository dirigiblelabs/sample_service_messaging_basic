/* globals $ */
/* eslint-env node, dirigible */

var response = require('net/http/response');
var messaging = require('service/messaging');

messaging.registerClient("client1");
messaging.registerClient("client2");

messaging.registerTopic("topic1");
messaging.registerTopic("topic2");

messaging.subscribe("client1", "topic1");

messaging.send("client1", "topic1", "Subject on Topic 1 from Client 1", "Message from Client1");
messaging.send("client1", "topic2", "Subject on Topic 2 from Client 1", "Message from Client1");

messaging.route();
var messages = messaging.receive("client1");

for(var i = 0; i < messages.length; i ++) {
    var message = messages[i];
    response.println(message.subject + " -> " + message.body);
}
response.flush();
response.close();