require('dotenv').config()
const mqtt = require('mqtt')

const options = {
    host: process.env.HOST,
    port: process.env.PORT,
    protocol: 'mqtts',
    username: process.env.USER,
    password: process.env.PASSWORD,
    // clientId: 'oqrkwopfk',
    // clean: false
}

const client = mqtt.connect(options);

client.on('connect', function () {
    console.log("Connected...")
    client.subscribe('rimacMobileTeam/1', { qos: 2 })
})

client.on('message', function (topic, message) {
    // message is Buffer
    //client.unsubscribe('rimacMobileTeam')
    console.log("i have received: " + message.toString() + " from topic: " + topic.toString())
    client.publish('rimacWebTeam/1', 'car info processed and returned', [{ retain: true }, { qos: 2 }])
})
