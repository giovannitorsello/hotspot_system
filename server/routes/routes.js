const express = require("express");
const session = require("express-session");
const router = express.Router();

const passport = require("passport");
const database = require("../database");
const { Websurfer, Ticket, Customer } = require("../database");
const generateRandomCredentials = require("../utils/random");

const senders = require("../utils/senders");
const { ticketUsername, ticketPassword } = generateRandomCredentials();

const createUser = require("../utils/radiusDB");
const dateUtils = require("../utils/dateUtils");
const axios = require("axios");

var customer = {};
var device = {};

router.use(session({ resave: false, saveUninitialized: true, secret: "secret" }));

router.get("/",(req,res) =>{
  res.send("/homepage");
})


module.exports = router;
