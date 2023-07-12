const express = require("express");
const session = require("express-session");
const router = express.Router();

// login/register tramite social
const passport = require("passport");
const database = require("../database");
const {Websurfer, Ticket, Customer, Device} = require("../database");
const generateRandomCredentials = require("../utils/random");

// invio sms, controllare che arrivino
const senders = require("../utils/senders");
const {ticketUsername, ticketPassword} = generateRandomCredentials();

// verificare se sono da eliminare
const folderLogos = "upload/folderCompanyLogo/"
const createUser = require("../utils/radiusDB");
const dateUtils = require("../utils/dateUtils");
const axios = require("axios");

var newConnection = {};
var customer = {};
var device = {};

router.use(session({resave: false, saveUninitialized: true, secret: "secret"}));


// ok
router.post("/getInfoWebsurfer", (req, res) => {
    res.json(newConnection);
});
// ok
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
        } else {
            res.send({status: "404", msg: "Device non Trovato", device: {}});
        }
    };

});
// ok
router.post("/getCustomerInfoByDevice", async (req, res) => {
    var CustomerId = req.body.CustomerId;
    if (CustomerId) {
        infoCustomer = await Customer.findOne({
            where: {
                id: CustomerId
            }
        });
        if (infoCustomer) {
            res.send({status: "200", msg: "Infomazioni Cliente", customer: infoCustomer});
        } else {
            res.send({status: "404", msg: "Errore nel fetch dei dati", customer: {}});
        }
    }
});
// ok
router.post("/", (req, res) => {
    newConnection = req.body;
    console.log(newConnection);
    res.redirect("https://hotspot.wifinetcom.net:60443");
});

// ok
router.get("/login", function (req, res) {
    res.render("pages/login_sms");
});

// ok
router.post("/auth/register", async (req, res) => {
    console.log(req.body);
    // check if websurfer exist
    wsFound = await Websurfer.findOne({
        where: {
            email: req.body.user.email
        }
    });
    if (wsFound) {
        console.log("utente esistente");
    } else {
        console.log("non esiste, creazione nuoto utente");
        wsNew = await Websurfer.create({
            firstname: req.body.user.firstname,
            lastname: req.body.user.lastname,
            email: req.body.user.email,
            phone: req.body.user.phone,
            CustomerId: req.body.customer.id,
            ResellerId: req.body.customer.ResellerId
        });
        if (wsNew) {
            console.log("Utente Creato" + wsNew);
            // Creazione primo ticket per il websurfer
            newTicket = await database.generateTicket(req.body.customer, req.body.device, wsNew, 7);
            console.log("New Ticket is: " + newTicket);
            // if project is in production
             senders.sendTicketBySms(wsNew.phone, newTicket);
            senders.sendTicketByEmail(wsNew.email, newTicket); 
            res.send({status: "200", msg: "Inserito con successo!"});
        }
    }
});

//OK
router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email", "phone"]
}));

//OK
router.get("/auth/google/callback", passport.authenticate("google", {failureRedirect: "https://hotspot.wifinetcom.net:60443/"}), async function (req, res) {
    var device,
        customer;
    try {
        const checkIfExist = await Websurfer.findOne({
            where: {
                email: req.user._json.email
            }
        });
        if (! checkIfExist) { // Find customerId and ResellerId
            device = await Device.findOne({
                where: {
                    api_key: newConnection.api_key
                }
            });
            customer = await Customer.findOne({
                where: {
                    id: device.CustomerId
                }
            })
            // Create new websurfer
            const newWebsurfer = await Websurfer.create({
                firstname: req.user._json.given_name,
                lastname: req.user._json.family_name,
                email: req.user._json.email,
                phone: "0000000000",
                idSocial: req.user.id,
                typeSocial: "GOOGLE",
                CustomerId: device.CustomerId,
                ResellerId: device.ResellerId
            });
            if (newWebsurfer) {
                const newTicket = await database.generateTicket(customer, device, newWebsurfer, 7);
                const emailUrlRedirectUser = `https://hotspot.wifinetcom.net:60443/success_social?id=${customer.id}&username=${newTicket.login}&password=${newTicket.password}&redirect=${device.postAuthLandingPage}`
                senders.sendTicketByEmail(newWebsurfer.email, newTicket, emailUrlRedirectUser);
                // il phone non viene letto da google
                // senders.sendTicketBySms(newWebsurfer.phone, newTicket);
                console.log(newTicket);
                res.redirect(emailUrlRedirectUser);
            } else {}
        }
    } catch (error) {
        console.error(error);
        // Handle error and send an appropriate response
        res.status(500).send("Internal Server Error");
    }
});

//OK
router.get("/auth/facebook", passport.authenticate("facebook",{ scope: ["public_profile", "email"]}));
//OK
router.get("/auth/facebook/callback", passport.authenticate("facebook", {failureRedirect: "https://hotspot.wifinetcom.net:60443/"}), async function (req, res) {
    var device,customer;
    try{
        const checkIfExist = await Websurfer.findOne({
            where:{
                email: req.user._json.email
            }
        });
        if(!checkIfExist){
            device = await Device.findOne({
                where:{
                    api_key: newConnection.api_key
                }
            });
            customer= await Customer.findOne({
                where:{
                    id: device.CustomerId
                }
            });
            const newWebsurfer = await Websurfer.create({
                firstname: req.user._json.first_name,
                lastname: req.user._json.last_name,
                email: req.user._json.email,
                phone: "0000000000",
                idSocial: req.user.id,
                typeSocial: "FACEBOOK",
                CustomerId: device.CustomerId,
                ResellerId: device.ResellerId
            });
            if(newWebsurfer){
                const newTicket = await database.generateTicket(customer,device,newWebsurfer,7);
                senders.sendTicketByEmail(newWebsurfer.email, newTicket);
                console.log(newTicket);
                res.redirect(`https://hotspot.wifinetcom.net:60443/success_social?id=${
                    customer.id
                }&username=${
                    newTicket.login
                }&password=${
                    newTicket.password
                }&redirect=${
                    device.postAuthLandingPage
                }`);
            }else{}
        }
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
