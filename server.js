const express = require('express');
const server = express();
const helmet = require('helmet');
const CronJob = require('cron').CronJob;
const cors = require('cors');
const moment = require('moment');

server.use(helmet());
server.use(cors());
server.use(express.json());

let num = 0;
let date = Date.now();
let hour = moment(date).format('HH');
let min = moment(date).add({ minutes: 5 }).format('mm');

const plusOne = new CronJob(`00 ${min - 3} ${hour} * * *`, async function () {
  console.log('added 1');
  num += 1;
});

const plusOneAgain = new CronJob(`00 ${min} ${hour} * * *`, async function () {
  console.log('added 1 again');
  num += 1;
});

plusOne.start();
plusOneAgain.start();

server.get('/', (req, res) => {
  res
    .status(200)
    .json({
      message: `Current num is: ${num}, should increase by one at : ${hour} ${
        min - 3
      } and again at ${hour} ${min}`,
    });
});

module.exports = server;
