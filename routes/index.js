const express = require('express');
const router = express.Router();
const {CronJob} = require('cron');
const request = require('request');
const headers = {'Content-Type':'application/json'};

//node-hue-api
const hue = require("node-hue-api");
const HueApi = hue.HueApi;
const lightState = hue.lightState;

let lightNum;

//表示用の関数
var displayLightNum = function(result){
  lightNum = result.lights.length;
  console.log(lightNum);
}

var displayResult = function(result){
  console.log(result);
}

var displayError = function(err){
  console.error(err);
}

//host情報
const host = "172.20.11.99"
const username = "d02sfHv8nPolNMQ9lrQjvY6FD4N8Ik9cygtg3gR4"
let api = new HueApi(host,username)
const state = lightState.create();

api = new HueApi(host,username);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  let startAm = req.body.startAm.match(/[0-9]{2}/g); //正規表現でhh:mmをhhとmmに分割．hhは[0]にmmは[1]に格納
  let endAm = req.body.endAm.match(/[0-9]{2}/g);

  let startPm = req.body.startPm.match(/[0-9]{2}/g);
  let endPm = req.body.endPm.match(/[0-9]{2}/g);

  /*
  cronの書き方
  秒 分 時 日 月 曜日
  */
  let cronAm = '0 '+startAm[1]+' '+startAm[0]+'-'+endAm[0]+' * * *';

  let cronStartPm = '0 '+startPm[1]+' '+startPm[0]+' * * *';
  let cronEndPm = '0 '+endPm[1]+' '+endPm[0]+' * * *';
  let date = new Date();

  let jobAm = new CronJob(cronAm, () => {
    //ここで午前中の調光処理
    let date = new Date();
    if(date.getHours() == parseInt(startAm[0])){
      //cron実行時刻がstart時刻と同じ場合（各日最初に実行される時）
      //この時は指定された色温度で点灯（amStartColorTemp）
      //なおreq.body.amStartColorTempで開始時の色温度
      //　　req.body.amEndColorTemp  で終了時の色温度が取得できる
      for(var i = 0; i < 7; i++){
        console.log(i);
        api.setLightState(i+1,state.on().bri(10).ct(153)).then(displayResult).fail(displayError).done();         
      }
    }else{
      /*
      それ以外の場合は色温度を下げて行く
      色温度をxy色度，明度，彩度でどのように下げて行くのかは調査が必要
      */
      for(var i = 0; i < 7; i++){
        api.setLightState(i+1,state.on().bri(255).ct(153)).then(displayResult).fail(displayError).done();
      }
    }
    console.log('Hello am');
  }, null, true);
  res.render('index', { title: 'Express' });
});

module.exports = router;
