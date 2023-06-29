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
router.post("/logoCustomer", (req,res) =>{
    console.log(req.body);
    var id = req.body.id;
    const logoName = "customer_"+ id +".jpg";
    const logoPath = folderLogos+ logoName; 
    console.log(logoPath);
    res.sendFile(logoPath , { root: '/' });
})

router.post("/", (req, res) => {
    newConnection = req.body;
    console.log(newConnection);
    res.redirect("https://hotspot.wifinetcom.net:60443");
});

/* router.post("/", (req, res) => {
    res.render("pages/auth");
    device = req.body;
    console.log(device);
}); */

router.get("/login", function (req, res) {
    res.render("pages/login_sms");
});

router.get("/register", function (req, res) {
    res.render("pages/register");
});

router.post("/auth/register", async (req, res) => {
    try {
        console.log(device);

        // Controlli preliminari
        if (!req.body)
            res.render("pages/error");
        if (!req.body.firstname)
            res.render("pages/error");
        if (!req.body.lastname)
            res.render("pages/error");
        if (!req.body.email)
            res.render("pages/error");
        if (!req.body.phone)
            res.render("pages/error");
        if (! device.pin)
            res.render("pages/error");

        const customer = await Customer.findOne({
            where: {
                pin: device.pin
            }
        });
        console.log("Customer is", customer.id);

        // Ulteriore controllo
        if (! customer)
            res.render("pages/error");

        webSurferFound = await Websurfer.findOne({
            where: {
                email: req.body.email
            }
        });

        // Caso websurfer trovato
        if (webSurferFound != null) {
            console.log("Websurfer found: ", webSurferFound.id);
            // Aggiorna il customer ID
            webSurferFound = await webSurferFound.update({CustomerId: customer.id});
            // cerca un eventuale ticket esistente
            var ticketFound = await Ticket.findOne({
                where: {
                    WebsurferId: webSurferFound.id
                }
            });
            if (ticketFound) { // First update origin data
                ticketFound = await ticketFound.update({CustomerId: customer.id, ResellerId: customer.ResellerId, pinAzienda: customer.pin, note: "Created by registration."});
                console.log("Ticket found is. ", ticketFound.login);

                // invio tramite sms o email
                senders.sendTicketByEmail(webSurferFound.email, ticketFound);
                senders.sendTicketBySms(webSurferFound.phone, ticketFound);
                res.status(301).redirect("http://wifi.hotspot.local/login_local.html");
            } else { // Creazione nuovo ticket
                const newTicket = database.generateTicket(customer, webSurferFound, 7);
                console.log("New ticket is. ", newTicket.login);
                // invio tramite sms o email
                senders.sendTicketByEmail(webSurferFound.email, newTicket);
                senders.sendTicketBySms(webSurferFound.phone, newTicket);
                res.status(301).redirect("http://wifi.hotspot.local/login_local.html");
            }
        } else { // Caso websurfer ignoto
            webSurferNew = await Websurfer.create({
                CustomerId: customer.id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone
            });
            if (webSurferNew != null) {
                console.log("Websurfer created: ", webSurferNew.id);
                // Creazione nuovo ticket
                const newTicket = database.generateTicket(customer, webSurferNew, 7);
                console.log("Generated ticket is", newTicket.login);
                // invio tramite sms o email
                senders.sendTicketByEmail(webSurferNew.email, newTicket);
                senders.sendTicketBySms(webSurferNew.phone, newTicket);
                console.log("Redirect to: ", customer.web);
                res.status(301).redirect("http://wifi.hotspot.local/login_local.html");
            }
        }
    } catch (error) {
        console.log("Error in /auth/register");
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
