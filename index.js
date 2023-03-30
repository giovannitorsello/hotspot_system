var config = require("./config.js").load();
const express = require('express');
const app = express();
const passport = require('passport');
const fs = require('fs');
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser');
const passportConfig = require('./passport');
const routes = require('./routes');
const routesDashboard = require('./routesDashboard');
const {sequelize, connectToDatabase, syncModels} = require('./database');

connectToDatabase();
syncModels();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/assets'));
app.use('/', routes);
app.use('/admin', routesDashboard);

const options = {
    key: fs.readFileSync(process.cwd() +config.server.sslCertificateKey),
    cert: fs.readFileSync(process.cwd() +config.server.sslCertificateCrt)
  };
  
console.log("Server is listening http on port: "+config.server.http_port);
http.createServer(options, app).listen(config.server.http_port);
  //app.listen(config.server.http_port);
  
console.log("Server is listening http on port: "+config.server.https_port);
https.createServer(options, app).listen(config.server.https_port);


app.use(passport.initialize());
app.use(passport.session());

//const port = process.env.PORT || 80;
//app.listen(port, () => console.log('App listening on port ' + port));
