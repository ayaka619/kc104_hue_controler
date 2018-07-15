const express = require('express');
const router = express.Router();

//node-cron
const {CronJob} = require('cron');
const cron = require('node-cron');

//node-hue-api
const hue = require("node-hue-api");
const HueApi = hue.HueApi;
const lightState = hue.lightState;

let lightNum;
let nowColorTemp = 153; //153~500

//表示用の関数
let displayLightNum = function(result){
  lightNum = result.lights.length;
  console.log(lightNum);
}

let displayResult = function(result){
  console.log(result);
}

let displayError = function(err){
  console.error(err);
}

//host情報
// const host = "172.20.11.99"
// const username = "d02sfHv8nPolNMQ9lrQjvY6FD4N8Ik9cygtg3gR4"
// let api = new HueApi(host,username)
// const state = lightState.create();

// api = new HueApi(host,username);

/* GET home page. */
router.get('/', function(req, res, next) {
  //host情報
  const host = "172.20.11.99"
  const username = "d02sfHv8nPolNMQ9lrQjvY6FD4N8Ik9cygtg3gR4"
  let api = new HueApi(host,username)
  const state = lightState.create();
  for(var i=0;i<7;i++){
    api.setLightState(i+1,state.on().bri(255).ct(153));
  }
  res.render('index', { title: 'Express' });
});

router.post('/realtime', function(req, res, next) {
  console.log(req.body);

  //host情報
  const host = req.body.bridgeIp;
  const username = req.body.username;
  let api = new HueApi(host,username)
  const state = lightState.create();

  for(var i=0;i<7;i++){
    api.setLightState(i+1,state.on().bri(req.body.brightness).sat(req.body.saturation).ct(req.body.colorTemp));
  }
});

router.post('/', function(req, res, next) {
  console.log(req.body);

  //host情報
  const host = req.body.bridgeIp;
  const username = req.body.username;
  let api = new HueApi(host,username)
  const state = lightState.create();


  //正規表現で入力されたhh:mmをhhとmmに分割．hhは[0]にmmは[1]に格納
  let startAm = req.body.startAm.match(/[0-9]{2}/g); 
  let endAm = req.body.endAm.match(/[0-9]{2}/g);

  let startPm = req.body.startPm.match(/[0-9]{2}/g);
  let endPm = req.body.endPm.match(/[0-9]{2}/g);

  /*
  cronの書き方
  秒 分 時 日 月 曜日
  */
  // let cronAm = '0 '+startAm[1]+' '+startAm[0]+'-'+endAm[0]+' * * *';
  let cronAm = '0 0,10,20,30,40,50 '+startAm[0]+'-'+endAm[0]+' * * *'; //startAm[0]時〜endAm[0]時まで10分おきに実行
  // let cronPm = '0 '+startPm[1]+' '+startPm[0]+'-'+endPm[0]+' * * *';
  let cronPm = '0 0,10,20,30,40,50 '+startPm[0]+'-'+endPm[0]+' * * *'; //startPm[0]時〜endPm[0]時まで10分おきに実行


  //ct = 500が一番色温度が低い，ct = 153が一番色温度が高い
  let jobAm = cron.schedule(cronAm, function(){
    if(nowColorTemp < 153){
      nowColorTemp = 153;
    }
    for(var i = 0; i < 7; i++){
      console.log(i);
      api.setLightState(i+1,state.on().bri(255).ct(nowColorTemp)).then(displayResult).fail(displayError).done();         
    }
    nowColorTemp = nowColorTemp - parseInt((500-153) / ((endAm[0] - startAm[0]) * 6)); 
    console.log(nowColorTemp);
  });

  let jobPm = cron.schedule(cronPm, function(){
    if(nowColorTemp > 500){
      nowColorTemp = 500;
    }
    for(var i = 0; i < 7; i++){
      console.log(i);
      api.setLightState(i+1,state.on().bri(255).ct(nowColorTemp)).then(displayResult).fail(displayError).done();         
    }
    nowColorTemp = nowColorTemp + parseInt((500-153) / ((endAm[0] - startAm[0]) * 6)); 
    console.log(nowColorTemp);
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
