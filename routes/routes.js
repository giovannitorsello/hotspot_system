const express = require("express");
const session = require("express-session");
const router = express.Router();
const passport = require("passport");
const { Websurfer, Ticket, Customer } = require("../database");
const generateRandomCredentials = require("../utils/random");
const senders = require("../utils/senders");
const { ticketUsername, ticketPassword } = generateRandomCredentials();
const createUser = require("../utils/radiusDB");
const dateUtils = require("../utils/dateUtils");
const axios = require("axios");
const Swal = require("sweetalert2");
const database = require("../database");
var customer = {};
var device = {};

router.use(session({ resave: false, saveUninitialized: true, secret: "secret" }));

router.get("/", function (req, res) {
  res.render("pages/auth");
});

router.post("/", (req, res) => {
  res.render("pages/auth");
  device = req.body;
  console.log(device);
});

router.get("/login", function (req, res) {
  res.render("pages/login_sms");
});

router.get("/register", function (req, res) {
  res.render("pages/register");
});

router.post("/auth/register", async (req, res) => {
  try {
    console.log(device);

    //Controlli preliminari
    if (!req.body) res.render("pages/error");
    if (!req.body.firstname) res.render("pages/error");
    if (!req.body.lastname) res.render("pages/error");
    if (!req.body.email) res.render("pages/error");
    if (!req.body.phone) res.render("pages/error");
    if (!device.pin) res.render("pages/error");

    const customer = await Customer.findOne({ where: { pin: device.pin } });
    console.log("Customer is", customer);

    //Ulteriore controllo
    if (!customer) res.render("pages/error");

    webSurferFound = await Websurfer.findOne({ where: { email: req.body.email } });

    //Caso websurfer trovato
    if (webSurferFound != null) {
      console.log("Websurfer found: ", webSurferFound.id);
      //Aggiorna il customer ID
      webSurferFound = await webSurferFound.update({ CustomerId: customer.id });
      //cerca un eventuale ticket esistente
      var ticketFound = await Ticket.findOne({ where: { WebsurferId: webSurferFound.id } });
      if (ticketFound) {
        //First update origin data
        ticketFound = await ticketFound.update({ CustomerId: customer.id, ResellerId: customer.ResellerId, pinAzienda: customer.pin, note: "Created by registration." });
        console.log("Ticket found is. ", ticketFound.login);

        //invio tramite sms o email
        senders.sendTicketByEmail(webSurferFound.email, ticketFound);
        senders.sendTicketBySms(webSurferFound.phone, ticketFound);
        res.status(301).redirect("http://wifi.hotspot.local/login_local.html");
      } else {
        //Creazione nuovo ticket
        const newTicket = database.generateTicket(customer, webSurferFound, 7);
        console.log("New ticket is. ", newTicket.login);
        //invio tramite sms o email
        senders.sendTicketByEmail(webSurferFound.email, newTicket);
        senders.sendTicketBySms(webSurferFound.phone, newTicket);
        console.log("Redirect to: ", customer.web);
        res.status(301).redirect("http://wifi.hotspot.local/login_local.html");
      }
    } else {
      //Caso websurfer ignoto
      webSurferNew = await Websurfer.create({ CustomerId: customer.id, firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phone: req.body.phone });
      if (webSurferNew != null) {
        console.log("Websurfer created: ", webSurferNew.id);
        //Creazione nuovo ticket
        const newTicket = database.generateTicket(customer, webSurferNew, 7);
        console.log("Generated ticket is", newTicket.login);
        //invio tramite sms o email
        senders.sendTicketByEmail(webSurferNew.email, newTicket);
        senders.sendTicketBySms(webSurferNew.phone, newTicket);
        console.log("Redirect to: ", customer.web);
        res.status(301).redirect("http://wifi.hotspot.local/login_local.html");
      }
    }
  } catch (error) {
    console.log("Error in /auth/register");
    res.render("pages/error");
  }
});

router.get("/auth/success", (req, res) => {
  res.render("pages/successLogin", {
    username: ticketUsername,
    password: ticketPassword,
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/error" }), function (req, res) {
  Websurfer.findOne({ where: { email: userProfile._json.email } }).then((socialUser) => {
    if (socialUser == null) {
      Websurfer.create({
        firstname: userProfile._json.given_name,
        lastname: userProfile._json.family_name,
        email: userProfile._json.email,
        phone: "000000000",
        idSocial: userProfile.id,
        typeSocial: "GOOGLE",
        CustomerId: customer.id,
      })
        .then((newWebsurfer) => {
          if (newWebsurfer) {
            createUser(ticketUsername, ticketPassword);
            res.render("pages/successLogin", {
              username: ticketUsername,
              password: ticketPassword,
            });
            /* res.redirect("http://10.10.10.178/hotspot/login.html"); */
          } else {
            res.send("ERRORE CREAZIONE");
          }
        })
        .catch((error) => {
          res.send(error);
        });
    } else {
      console.log("ESISTE GIA");
      res.render("pages/auth");
    }
  });
});

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/error" }), function (req, res) {
  Websurfer.create({
    firstname: userProfileFacebook.displayName,
    lastname: "",
    email: "",
    phone: "000000000",
    idSocial: userProfileFacebook.id,
    typeSocial: "FACEBOOK",
    CustomerId: customer.id,
  })
    .then((newWebsurfer) => {
      if (newWebsurfer) {
        createUser(ticketUsername, ticketPassword);
        res.render("pages/successLogin", {
          username: ticketUsername,
          password: ticketPassword,
        });
      } else {
        res.send("ERRORE CREAZIONE");
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/success", (req, res) => {
  res.render("pages/success", { socialUser: userProfile });
});

router.get("/error", (req, res) => res.send("error logging in"));

module.exports = router;
