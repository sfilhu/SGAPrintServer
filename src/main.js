console.log(123)
//import Vue from 'vue'
// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'
//import App from './App.vue'

// require('dotenv').config();
const express  = require('express');
const fs       = require('fs');
const path     = require('path');
const morgan   = require('morgan');
const cors     = require('cors');
const routes   = require('./routes');
const app      = new express();

// const dist     = require('electron').remote.app;
//const dirDocuments = dist.getPath('documents');

const httpsOpt = {
 cert : fs.readFileSync(path.join(__dirname,'ssl', 'cert.pem')),
 key  : fs.readFileSync(path.join(__dirname,'ssl', 'key.pem'))
}

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


const server = require('https').Server(httpsOpt, app);
server.listen(3001)

//Vue.config.productionTip = false

// Vue
// .use(VueMaterial)

// new Vue({
//      render: h => h(App),
// }).$mount('#app')