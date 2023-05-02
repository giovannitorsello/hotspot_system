var config = require("./config.js").load();
var cors = require('cors');
const express = require("express");
const app = express();
const schedule = require("node-schedule");
const passport = require("passport");
const fs = require("fs");
const https = require("https");
const http = require("http");
const bodyParser = require("body-parser");
const passportConfig = require("./utils/passport");
const routes = require("./routes/routes");
const routesDashboard = require("./routes/routesDashboard");
const { sequelize, connectToDatabase, syncModels } = require("./database");

connectToDatabase();
syncModels();

//SCHEDULER DI AGGIORNAMENTO DEL DB
/* const job = schedule.scheduleJob('0 10 * * * *', function(){
  syncModels();
}); */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/assets"));
app.use("/", routes);
app.use("/admin", routesDashboard);

app.use(passport.initialize());
app.use(passport.session());

const options = {
  key: fs.readFileSync(process.cwd() + config.server.sslCertificateKey),
  cert: fs.readFileSync(process.cwd() + config.server.sslCertificateCrt),
};

console.log("Server is listening http on port: " + config.server.http_port);
http.createServer(options, app).listen(config.server.http_port);

console.log("Server is listening http on port: " + config.server.https_port);
https.createServer(options, app).listen(config.server.https_port);
