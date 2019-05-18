const express = require('express');
const app = express();
const server = require('http').createServer(app);
const assert = require('assert');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');

const login = require('./routes/loginRoutes/loginRoute.js');
const ManagerGetRoutes = require('./routes/managerRoutes/getRoutes');
const SecretaryGetRoutes = require('./routes/secretaryRoutes/getRoutes');
const ClientGetRoutes = require('./routes/clientRoutes/getRoutes');

// var MongoClient = require('mongodb').MongoClient;
// //onst uri = "mongodb://172.16.32.40:27017/";
// const uri = "mongodb://172.16.8.29:27017/";

var mongoUtil = require( './public/assets/scripts/mongdb' );

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(session({
    secret:'this my sample session',
    username:"",
    isLogin:false,
    resave:false,
    saveUninitialized:true
}));
app.use(flash());

login(app);
ManagerGetRoutes(app);
SecretaryGetRoutes(app);
ClientGetRoutes(app);

const port = process.env.PORT || 3000;

// MongoClient.connect(uri,{useNewUrlParser:true},(err,res)=>{
//     assert.equal(null, err);
//     app.listen(port,(err,res)=>{console.log(`Listening to port ${port}.....`)});
// });

mongoUtil.connectToServer( function( err, client ) {
    if (err) console.log("NOT CONNECTED TO DATABASE");
      assert.equal(null, err);
      app.listen(port,(err,res)=>{console.log(`Listening to port ${port}.....`)});
  });