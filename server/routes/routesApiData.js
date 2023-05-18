const express = require("express");
const session = require("express-session");
const router = express.Router();
const passport = require("passport");
const database = require("../database");
const { User, Websurfer, Ticket, Customer, Device } = require("../database");
const generateRandomCredentials = require("../utils/random");
const senders = require("../utils/senders");
const { ticketUsername, ticketPassword } = generateRandomCredentials();
const createUser = require("../utils/radiusDB");
const dateUtils = require("../utils/dateUtils");
const axios = require("axios");
var customer = {};
var device = {};

//////////////////// LOGIN ////////////////
router.post("/api/login", async (req, res) => {
  //Prevent errors
  if (!req.body || !req.body.username || !req.body.password) res.send({ status: "404", msg: "Login incorrect" });

  const user = await User.findOne({ where: { utente: req.body.username, password: req.body.password } });
  if (user != null) {
    res.send({ status: "200", msg: "Login ok.", state: "ok", user: user });
  } else {
    res.send({ status: "404", msg: "Login incorrect.", state: "error" });
  }
});

//////////////////// SUPER ADMIN ROUTES ////////////////////
router.post("/api/reseller/save", async (req, res) => {
  var reseller = req.body.reseller;
  if (!reseller || !reseller.vatCode) {
    res.send({ status: "404", msg: "DATI NON COMPLETI O ERRATI" });
    return;
  }

  if (reseller.id && reseller.id > 0) foundCustomer = await Customer.findOne({ where: { id: reseller.id } });
  else foundReseller = await Device.findOne({ where: { reseller: reseller.vatCode } });
  //NEW INSERT
  if (foundReseller == null) {
    var resellerToInsert = Object.assign({}, reseller);
    var resellerSaved = await Reseller.create(resellerToInsert);
    if (resellerSaved) res.send({ status: "200", msg: "DISPOSITIVO INSERITO", reseller: resellerSaved, isNewInsert: "true" });
    else res.send({ status: "404", msg: "DATI NON COMPLETI O ERRATI" });
  }
  //UPDATE
  if (foundReseller && foundReseller.id !== 0) {
    var resellerUpdated = await foundCustomer.update(reseller);
    if (resellerUpdated) res.send({ status: "200", msg: "DISPOSITIVO SALVATO", reseller: resellerUpdated });
    else res.send({ status: "404", msg: "DATI NON COMPLETI O ERRATI" });
  }
});

//////////////////// USERS MANAGEMENT ROUTES ///////////////
router.post("/api/customer/save", async (req, res) => {
  var customer = req.body.customer;
  if (!customer || !(customer.fiscalCode || customer.vatCode)) {
    res.send({ status: "404", msg: "DATI NON COMPLETI O ERRATI" });
    return;
  }

  if (customer.id && customer.id > 0) foundCustomer = await Customer.findOne({ where: { id: customer.id } });
  else foundCustomer = await Customer.findOne({ where: { fiscalCode: customer.fiscalCode, vatCode: customer.vatCode } });
  //NEW INSERT
  if (foundCustomer == null) {
    var customerToInsert = Object.assign({}, customer);
    var customerSaved = await Customer.create(customerToInsert);
    if (customerSaved) res.send({ status: "200", msg: "DISPOSITIVO INSERITO", customer: customerSaved, isNewInsert: "true" });
    else res.send({ status: "404", msg: "DATI NON COMPLETI O ERRATI" });
  }
  //UPDATE
  if (foundCustomer && foundCustomer.id !== 0) {
    var customerUpdated = await foundCustomer.update(customer);
    if (customerUpdated) res.send({ status: "200", msg: "CLIENTE SALVATO.", customer: customerUpdated });
    else res.send({ status: "404", msg: "DATI NON COMPLETI O ERRATI" });
  }
});

router.post("/api/customer/delete", async (req, res) => {
  var customer = req.body.customer;
  if (!customer || !customer.id) {
    res.send({ status: "404", msg: "ERRORE NELLA CANCELLAZIONE DEL CLIENTE." });
    return;
  }

  foundCustomer = await Customer.findOne({ where: { id: customer.id } });
  if (foundCustomer) {
    foundCustomer.destroy();
    res.send({ status: "200", msg: "CLIENTE ELIMINATO", customer: customer });
  } else {
    res.send({ status: "404", msg: "ERRORE NELLA CANCELLAZIONE DEL CLIENTE." });
  }
});

router.post("/api/user/getResellerByUser", async function (req, res) {
  if (!req.body || !req.body.user || !req.body.user.id) res.send({ status: "404", msg: "No customer data present", state: "error", reseller: {} });
  const user = req.body.user;
  var reseller = await database.getResellerByUser(user);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    reseller: reseller,
  });
});

router.post("/api/user/getCustomerByUser", async function (req, res) {
  if (!req.body || !req.body.user || !req.body.user.id) res.send({ status: "404", msg: "No customer data present", state: "error", customer: {} });
  const user = req.body.user;
  var customer = await database.getCustomerByUser(user);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    customer: customer,
  });
});

//////////////////// CUSTOMERS MANAGEMENT ROUTES ///////////////
router.post("/api/customer/getUsersByCustomer", async function (req, res) {
  if (!req.body || !req.body.customer || !req.body.customer.id) res.send({ status: "404", msg: "No customer data present", state: "error", users: {} });
  const customer = req.body.customer;
  var users = await database.getUsersByCustomer(customer);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    users: users,
  });
});

router.post("/api/customer/getDevicesByCustomer", async function (req, res) {
  if (!req.body || !req.body.customer || !req.body.customer.id) res.send({ status: "404", msg: "No customer data present", state: "error", users: {} });
  const customer = req.body.customer;
  var devices = await database.getDevicesByCustomer(customer);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    devices: devices,
  });
});

router.post("/api/customer/getTicketsByCustomer", async function (req, res) {
  if (!req.body || !req.body.customer || !req.body.customer.id) res.send({ status: "404", msg: "No customer data present", state: "error", tickets: {} });
  const customer = req.body.customer;
  var tickets = await database.getTicketsByCustomer(customer);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    tickets: tickets,
  });
});

router.post("/api/customer/getActiveTicketsByCustomer", async function (req, res) {
  if (!req.body || !req.body.customer || !req.body.customer.id) res.send({ status: "404", msg: "No customer data present", state: "error", tickets: {} });
  const customer = req.body.customer;
  var tickets = await database.getActiveTicketsByCustomer(customer);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    tickets: tickets,
  });
});

router.post("/api/customer/getExpiredTicketsByCustomer", async function (req, res) {
  if (!req.body || !req.body.customer || !req.body.customer.id) res.send({ status: "404", msg: "No customer data present", state: "error", tickets: {} });
  const customer = req.body.customer;
  var tickets = await database.getExpiredTicketsByCustomer(customer);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    tickets: tickets,
  });
});

router.post("/api/customer/generateTicketForNewWebsurfer", async function (req, res) {
  if (!req.body || !req.body.websurfer || !req.body.websurfer.id) res.send({ status: "404", msg: "No websurfer data present", state: "error", ticket: {} });
  const customer = req.body.customer;
  const websurfer = req.body.websurfer;

  var ticket = await database.generateTicketForNewWebsurfer(customer, websurfer);
  res.send({
    status: "200",
    msg: "Ticket generated or renewed.",
    state: "ok",
    ticket: ticket,
  });
});

router.post("/api/websurfer/save", async (req, res) => {
  var websurfer = req.body.websurfer;
  if (!websurfer || !(websurfer.email || websurfer.phone)) {
    res.send({ status: "404", msg: "DATI NON COMPLETI O ERRATI" });
    return;
  }

  if (websurfer.id && websurfer.id > 0) foundWebsurfer = await Websurfer.findOne({ where: { id: websurfer.id } });
  else foundWebsurfer = await Device.findOne({ where: { email: websurfer.email } });
  //NEW INSERT
  if (foundWebsurfer == null) {
    var websurferToInsert = Object.assign({}, websurfer);
    var websurferSaved = await Websurfer.create(websurferToInsert);
    if (websurferSaved) res.send({ status: "200", msg: "DISPOSITIVO INSERITO", websurfer: websurferSaved, isNewInsert: "true" });
    else res.send({ status: "404", msg: "DATI NON COMPLETI O ERRATI" });
  }
  //UPDATE
  if (foundWebsurfer && foundWebsurfer.id !== 0) {
    var websurferUpdated = await foundWebsurfer.update(websurfer);
    if (websurferUpdated) res.send({ status: "200", msg: "DISPOSITIVO SALVATO", websurfer: websurferUpdated });
    else res.send({ status: "404", msg: "DATI NON COMPLETI O ERRATI" });
  }
});

//////////////////// RESELLER MANAGEMENT ROUTES ///////////////
router.post("/api/reseller/getCustomersByFulltextSearch", function (req, res) {
  if (!req.body || !req.body.searchString) res.send({ status: "404", msg: "No reseller data present", state: "error", customers: {} });
  const searchString = req.body.searchString;
  var customers = database.getCustomersByFulltextSearch(searchString);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    customers: customers,
  });
});

router.post("/api/reseller/getUsersByReseller", async function (req, res) {
  if (!req.body || !req.body.reseller || !req.body.reseller.id) res.send({ status: "404", msg: "No reseller data present", state: "error", users: {} });
  const reseller = req.body.reseller;
  var users = await database.getUsersByReseller(reseller);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    users: users,
  });
});

router.post("/api/reseller/getDevicesByReseller", async function (req, res) {
  if (!req.body || !req.body.reseller || !req.body.reseller.id) res.send({ status: "404", msg: "No reseller data present", state: "error", users: {} });
  const reseller = req.body.reseller;
  var devices = await database.getUsersByReseller(reseller);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    devices: devices,
  });
});

router.post("/api/reseller/getCustomersByReseller", async function (req, res) {
  if (!req.body || !req.body.reseller || !req.body.reseller.id) res.send({ status: "404", msg: "No reseller data present", state: "error", customers: {} });
  const reseller = req.body.reseller;
  var customers = await database.getCustomersByReseller(reseller);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    customers: customers,
  });
});

router.post("/api/reseller/getResellers", async function (req, res) {
  var resellers = await database.getResellers();
  if (!resellers) res.send({ status: "404", msg: "No weseller data present", state: "error", resellers: {} });

  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    resellers: resellers,
  });
});

//////////////////// DEVICES MANAGEMENT ROUTES ///////////////
router.post("/api/device/save", async (req, res) => {
  var device = req.body.device;
  if (!device || !(device.ipv4Management || device.ipv6Management)) {
    res.send({ status: "404", msg: "DATI NON COMPLETI O ERRATI" });
    return;
  }

  if (!device.ipv4Management) device.ipv4Management = "";
  if (!device.ipv6Management) device.ipv6Management = "";
  if (device.id && device.id > 0) foundDevice = await Device.findOne({ where: { id: device.id } });
  else foundDevice = await Device.findOne({ where: { ipv4Management: device.ipv4Management, ipv6Management: device.ipv6Management } });
  //NEW INSERT
  if (foundDevice == null) {
    var deviceToInsert = Object.assign({}, device);
    var deviceSaved = await Device.create(deviceToInsert);
    if (deviceSaved) res.send({ status: "200", msg: "DISPOSITIVO INSERITO", device: deviceSaved, isNewInsert: "true" });
    else res.send({ status: "404", msg: "DATI NON COMPLETI O ERRATI" });
  }
  //UPDATE
  if (foundDevice && foundDevice.id !== 0) {
    //foundDevice = Object.assign({ id: foundDevice.id }, device);
    var deviceUpdated = await foundDevice.update(device);
    if (deviceUpdated) res.send({ status: "200", msg: "DISPOSITIVO SALVATO", device: deviceUpdated });
    else res.send({ status: "404", msg: "DATI NON COMPLETI O ERRATI" });
  }
});

router.post("/api/device/delete", async (req, res) => {
  var device = req.body.device;
  foundDevice = await Device.findOne({ where: { ipv4Management: device.ipv4Management } });
  const result = foundDevice.destroy();
  res.send({ status: "200", msg: "DISPOSITIVO ELIMINATO", result: result });
});
router.post("/api/device/getResellerByDevice", async (req, res) => {});
router.post("/api/device/getCustemerByDevice", async (req, res) => {});

//////////////////// WEBSURFER MANAGEMENT ROUTES ///////////////
router.post("/api/websurfer/getWebsurfersByCustomer", async function (req, res) {
  if (!req.body || !req.body.customer || !req.body.customer.id) res.send({ status: "404", msg: "No customer data present", state: "error", websurfers: {} });
  const customer = req.body.customer;
  var websurfers = await database.getWebSurfersByCustomer(customer);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    websurfers: websurfers,
  });
});

router.post("/api/websurfer/getTicketsByWebsurfer", function (req, res) {
  if (!req.body || !req.body.websurfer || !req.body.websurfer.id) res.send({ status: "404", msg: "No websurfer data present", state: "error", tickets: {} });
  const websurfer = req.body.websurfer;
  var tickets = database.getTicketsByWebsurfer(websurfer);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    tickets: tickets,
  });
});

module.exports = router;
