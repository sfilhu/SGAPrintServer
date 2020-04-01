import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import App from './App.vue'

require('dotenv').config();
const express  = require('express');
// const fs       = require('fs');
// const path     = require('path');
const morgan   = require('morgan');
const cors     = require('cors');
const routes   = require('./routes');
const app      = new express();
// const dirname = fs.realpathSync('.');
// console.log(dirname)
// console.log(__dirname)
// console.log(process.cwd())

// const httpsOpt = {
//   cert : fs.readFileSync(path.join(dirname, 'extraResources/cert.pem')),
//   key  : fs.readFileSync(path.join(dirname, 'extraResources/key.pem'))
// }

const dist = require('electron').remote.app;

console.log(dist.getAppPath())

app
.use(cors())
.use(express.json())
.use(express.urlencoded({ extended: true }))
.use(morgan('dev'))
.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
.use(routes)

const server = require('http').Server(app);
server.listen(3001)

Vue.config.productionTip = false

Vue
.use(VueMaterial)

new Vue({
  render: h => h(App),
}).$mount('#app')
