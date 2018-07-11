# KC104壁面照明コントローラ

# 概要
KC104の壁面照明に使用されるhueの調光システム  
現状は設定した時刻に合わせた色温度の増減に対応．  

# 動作環境
- node.js v10.4.1

# 使用ライブラリ
- node-hue-api（https://www.npmjs.com/package/node-hue-api）

# 使用方法
1. git clone https://github.com/ayaka619/kc104_hue_controler.git
2. kc104_hue_controlerへディレクトリ移動
3. npm start
4. ブラウザで 'http://localhost:3000' にアクセス

# 参考にしたURL
- https://github.com/kelektiv/node-cron
- https://qiita.com/akameco/items/51a0229dbea5d403543b
- https://felicegattuso.com/projects/timedropper/