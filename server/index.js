var config = require("./config.js").load();
const express = require("express");
const fs = require("fs");
const https = require("https");
const http = require("http");
const cors = require("cors");
const fileupload = require("express-fileupload");

const passport = require("passport");
const schedule = require("node-schedule");

const routes = require("./routes/routes");
const routesDashboard = require("./routes/routesDashboard");
const routesApiData = require("./routes/routesApiData");

const { sequelize, connectToDatabase, syncModels } = require("./database");

const app = express();


connectToDatabase();
syncModels();

//SCHEDULER DI AGGIORNAMENTO DEL DB
/* const job = schedule.scheduleJob('0 10 * * * *', function(){
  syncModels();
}); */

app.use(cors());
app.use(
  fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: process.cwd + "/tmp/",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('login/dist'));
app.use("/logo", express.static(__dirname + "/upload/folderCompanyLogo"));
app.use("/", routes);
app.use("/", routesApiData);
app.use("/admin", routesDashboard);

app.use(passport.initialize());
app.use(passport.session());

const options = {
  key: fs.readFileSync(process.cwd() + "/" + config.server.sslCertificateKey),
  cert: fs.readFileSync(process.cwd() + "/" + config.server.sslCertificateCrt),
};

console.log("Server is listening http on port: " + config.server.http_port);
http.createServer(options, app).listen(config.server.http_port);

console.log("Server is listening http on port: " + config.server.https_port);
https.createServer(options, app).listen(config.server.https_port);
