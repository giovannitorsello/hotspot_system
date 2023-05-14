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

router.post("/api/data/getResellers", function (req, res) {
  var resellers = database.getResellers();
  if (!resellers) res.send({ status: "404", msg: "No weseller data present", state: "error", resellers: {} });

  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    resellers: resellers,
  });
});

router.post("/api/data/getResellerByUser", function (req, res) {
  if (!req.body || !req.body.user || !req.body.user.id) res.send({ status: "404", msg: "No customer data present", state: "error", reseller: {} });
  const user = req.body.user;
  var reseller = database.getResellerByuser(user);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    reseller: reseller,
  });
});

router.post("/api/data/getCustomerByUser", function (req, res) {
  if (!req.body || !req.body.user || !req.body.user.id) res.send({ status: "404", msg: "No customer data present", state: "error", customer: {} });
  const user = req.body.user;
  var customer = database.getCustomerByUser(user);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    customer: customer,
  });
});

router.post("/api/data/getWebsurfersByCustomer", async function (req, res) {
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

router.post("/api/data/getUsersByCustomer", async function (req, res) {
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

router.post("/api/data/getUsersByReseller", async function (req, res) {
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

router.post("/api/data/getCustomersByReseller", function (req, res) {
  if (!req.body || !req.body.reseller || !req.body.reseller.id) res.send({ status: "404", msg: "No reseller data present", state: "error", customers: {} });
  const reseller = req.body.reseller;
  var customers = database.getCustomersByReseller(reseller);
  res.send({
    status: "200",
    msg: "Success.",
    state: "ok",
    customers: customers,
  });
});

router.post("/api/data/getTicketsByCustomer", async function (req, res) {
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

router.post("/api/data/getTicketsByWebsurfer", function (req, res) {
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

router.post("/api/data/getActiveTicketsByCustomer", async function (req, res) {
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

router.post("/api/data/getExpiredTicketsByCustomer", async function (req, res) {
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

router.post("/api/data/generateTicketForNewWebsurfer", async function (req, res) {
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

router.post("/api/data/getCustomersByFulltextSearch", function (req, res) {
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
module.exports = router;
