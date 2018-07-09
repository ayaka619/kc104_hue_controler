const express = require('express');
const router = express.Router();
const {CronJob} = require('cron');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  let startAm = req.body.startAm.match(/[0-9]{2}/g);
  let endAm = req.body.endAm.match(/[0-9]{2}/g);

  let startPm = req.body.startPm.match(/[0-9]{2}/g);
  let endPm = req.body.endPm.match(/[0-9]{2}/g);

  let cronStartAm = '0 '+startAm[1]+' '+startAm[0]+' * * *';
  let cronEndAm = '0 '+endAm[1]+' '+endAm[0]+' * * *';

  let cronStartPm = '0 '+startPm[1]+' '+startPm[0]+' * * *';
  let cronEndPm = '0 '+endPm[1]+' '+endPm[0]+' * * *';

  let jobAm = new CronJob(cronStartAm, () => {
    console.log('Hello am');
  }, null, true);
  
  let jobPm = new CronJob(cronStartPm, () => {
    console.log('Hello pm');
  }, null, true);

  res.render('index', { title: 'Express' });
});

module.exports = router;
