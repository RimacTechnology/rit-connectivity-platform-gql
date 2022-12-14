'use strict';

//module.exports.hello = async (event) => {

require('dotenv').config()
const mqtt = require('mqtt')
// const mysql = require('mysql')

const options = {
  host: process.env.HOST,
  port: process.env.PORT,
  protocol: 'mqtts',
  username: process.env.USER,
  password: process.env.PASSWORD,
  // clientId: 'oqrkwopfk',
  // clean: false
}

// const con = mysql.createConnection({
//     host: process.env.DBHOST,
//     user: process.env.DBUSER,
//     password: process.env.DBPASSWORD,
//     database: process.env.DB
// })

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected to DB...");

const client = mqtt.connect(options);

client.on('connect', function () {
  console.log("Connected...")
  // con.query("select Users.email, Cars.car_id, Cars.AC_isOn from Cars natural join Users_Cars natural join Users where Cars.car_id = ?;", [2], function (err, result, fields) {
  //     if (err) throw err;
  //     console.log(result)
  client.publish('rimacMobileTeam/1', 'Sending info to rimac web team', [{ retain: true }, { qos: 2 }])
  client.subscribe('rimacWebTeam/1', { qos: 2 })
})

client.on('message', function (topic, message) {
  let response = "i have received: " + message.toString() + " from topic: " + topic.toString();
  console.log(response)
  client.end()
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       message: response,
  //       input: event,
  //     },
  //     null,
  //     2
  //   ),
  // };
  // con.end()
})
  // });

//};



