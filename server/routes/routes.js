const express = require("express");
const session = require("express-session");
const router = express.Router();

//login/register tramite social
const passport = require("passport");
const database = require("../database");
const {Websurfer, Ticket, Customer, Device} = require("../database");
const generateRandomCredentials = require("../utils/random");

//invio sms, controllare che arrivino
const senders = require("../utils/senders");
const {ticketUsername, ticketPassword} = generateRandomCredentials();

//verificare se sono da eliminare
const folderLogos= "upload/folderCompanyLogo/"
const createUser = require("../utils/radiusDB");
const dateUtils = require("../utils/dateUtils");
const axios = require("axios");

var newConnection = {};
var customer = {};
var device = {};

router.use(session({resave: false, saveUninitialized: true, secret: "secret"}));

router.post("/getInfoWebsurfer", (req, res) => {
    res.json(newConnection);
});

router.post("/getDeviceByApiKey", async (req, res) => {
    var _api_key = req.body.api_key;
    if (_api_key) {
        foundDevice = await Device.findOne({
            where: {
                api_key: _api_key
            }
        });
        if (foundDevice) {
            res.send({status: "200", msg: "Device Trovato", device: foundDevice});
        }else{
          res.send({status: "404", msg: "Device non Trovato", device: {}});
        }
    };

});

router.post("/getCustomerInfoByDevice", async (req,res)=>{
    var CustomerId = req.body.CustomerId;
    if(CustomerId){
        infoCustomer= await Customer.findOne({
            where:{
                id: CustomerId,
            }
        });
        if(infoCustomer){
            res.send({status: "200", msg: "Infomazioni Cliente", customer: infoCustomer});
        }else{
            res.send({status: "404", msg: "Errore nel fetch dei dati", customer: {}});
        }
    }
});

router.post("/", (req, res) => {
    newConnection = req.body;
    console.log(newConnection);
    res.redirect("https://hotspot.wifinetcom.net:60443");
});

router.get("/login", function (req, res) {
    res.render("pages/login_sms");
});

router.post("/auth/register", async (req, res) => {
    console.log(req.body);
    //check if websurfer exist
    wsFound= await Websurfer.findOne({
        where:{
            email: req.body.user.email
        }
    });
    if(wsFound){
        console.log("utente esistente");
    }else{
        console.log("non esiste, creazione nuoto utente");
        wsNew = await Websurfer.create({
            firstname: req.body.user.firstname,
            lastname:req.body.user.lastname,
            email:req.body.user.email,
            phone:req.body.user.phone,
            CustomerId:req.body.customer.id,
            ResellerId:req.body.customer.ResellerId,
        });
        if(wsNew){
            console.log("Utente Creato" + wsNew);
            //Creazione primo ticket per il websurfer
            newTicket = await database.generateTicket(req.body.customer,req.body.device,wsNew,7);
            console.log("New Ticket is: " + newTicket);
            //if project is in production
            /* senders.sendTicketBySms(wsNew.phone, newTicket);
            senders.sendTicketByEmail(wsNew.email, newTicket); */
            res.send({status:"200",msg:"Inserito con successo!"});
        }
    }
});

router.get("/auth/success", (req, res) => {
    res.render("pages/successLogin", {
        username: ticketUsername,
        password: ticketPassword
    });
});

router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

router.get("/auth/google/callback", passport.authenticate("google", {failureRedirect: "http://wifi.hotspot.local"}), async function (req, res) {
    socialUser = await Websurfer.findOne({
        where: {
            email: userProfile._json.email
        }
    });
    if (socialUser == null) {
        var newWebsurfer = await Websurfer.create({
            firstname: userProfile._json.given_name,
            lastname: userProfile._json.family_name,
            email: userProfile._json.email,
            phone: "000000000",
            idSocial: userProfile.id,
            typeSocial: "GOOGLE",
            CustomerId: customer.id
        });

        if (newWebsurfer) {
            const newTicket = database.generateTicket(customer, newWebsurfer, 7);
            console.log("New ticket is. ", newTicket.login);
            // invio tramite sms o email
            senders.sendTicketByEmail(newWebsurfer.email, newTicket);
            senders.sendTicketBySms(newWebsurfer.phone, newTicket);
            // Abilitazione su RB
            // createUser(ticketUsername, ticketPassword);
            res.render("pages/successLogin", {
                username: newTicket.login,
                password: newTicket.password
            });
        } else {
            console.log("Error in /auth/google/callback");
            res.render("pages/error");
        }
    } else { // Recupero ticket esistente
        var ticketFound = await Ticket.findOne({
            where: {
                WebsurferId: socialUser.id
            }
        });
        console.log("Found ticket for user social: ", ticketFound);
        if (ticketFound.id) {
            res.render("pages/successLogin", {
                username: ticketFound.login,
                password: ticketFound.password
            });
        } else { // creazione nuovo ticket
            const newTicket = database.generateTicket(customer, socialUser, 7);
            console.log("New ticket is. ", newTicket.login);
            // invio tramite sms o email
            senders.sendTicketByEmail(socialUser.email, newTicket);
            senders.sendTicketBySms(socialUser.phone, newTicket);
            res.render("pages/successLogin", {
                username: newTicket.login,
                password: newTicket.password
            });
        }
    }
});

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get("/auth/facebook/callback", passport.authenticate("facebook", {failureRedirect: "/error"}), async function (req, res) {
    socialUser = await Websurfer.findOne({
        where: {
            firstname: userProfileFacebook.displayName
        }
    });
    if (socialUser == null) {
        var newWebsurfer = await Websurfer.create({
            firstname: userProfileFacebook.displayName,
            lastname: "",
            email: "",
            phone: "000000000",
            idSocial: userProfileFacebook.id,
            typeSocial: "FACEBOOK",
            CustomerId: customer.id
        });

        if (newWebsurfer) {
            const newTicket = database.generateTicket(customer, newWebsurfer, 7);
            console.log("New ticket is. ", newTicket.login);
            // invio tramite sms o email
            senders.sendTicketByEmail(newWebsurfer.email, newTicket);
            senders.sendTicketBySms(newWebsurfer.phone, newTicket);
            // Abilitazione su RB
            res.render("pages/successLogin", {
                username: newTicket.login,
                password: newTicket.password
            });
        } else {
            console.log("Error in /auth/facebook/callback");
            res.render("pages/error");
        }
    } else { // Recupero ticket esistente
        var ticketFound = await Ticket.findOne({
            where: {
                WebsurferId: socialUser.id
            }
        });
        console.log("Found ticket for user social: ", ticketFound);
        if (ticketFound.id) { // invio tramite sms o email
            senders.sendTicketByEmail(socialUser.email, ticketFound);
            senders.sendTicketBySms(socialUser.phone, ticketFound);

            res.render("pages/successLogin", {
                username: ticketFound.login,
                password: ticketFound.password
            });
        } else { // creazione nuovo ticket
            const newTicket = database.generateTicket(customer, socialUser, 7);
            console.log("New ticket is. ", newTicket.login);
            // invio tramite sms o email
            senders.sendTicketByEmail(socialUser.email, newTicket);
            senders.sendTicketBySms(socialUser.phone, newTicket);
            res.render("pages/successLogin", {
                username: newTicket.login,
                password: newTicket.password
            });
        }
    }
});

router.get("/success", (req, res) => {
    res.render("pages/success", {socialUser: userProfile});
});

router.get("/error", (req, res) => res.send("error logging in"));

module.exports = router;
