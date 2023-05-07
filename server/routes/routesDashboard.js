const express = require("express");
const routerDashboard = express.Router();
const db = require("../database");
const { Customer, User, Ticket, Websurfer } = require("../database");
const createUser = require("../utils/radiusDB");
const senders = require("../utils/senders");
var getDataUser = require("../data/getDataUser");
var getResellerUser = require("../data/getResellerData");
var userOBJ;

//AUTH PAGE
routerDashboard.post("/login", (req, res) => {
  //Prevent errors
  if (!req.body || !req.body.username || !req.body.password) res.send({ status: "404", msg: "Login incorrect" });

  User.findOne({
    where: {
      utente: req.body.username,
      password: req.body.password,
    },
  }).then(async function (user) {
    if (user != null) {
      //Case superadmin (Wifinetcom). send resellers
      if (user.role === "SUPERADMIN") {
        var resellers = await db.getResellers();
        res.send({ status: "200", msg: "Login ok.", state: "ok", user: user, resellers: resellers });
      }

      //Case reseller send user, customers
      if (user.role === "RESELLER") {
        var reseller = await db.getResellerByUser(user);
        var customers = await db.getCustomersByReseller(reseller);
        res.send({
          status: "200",
          msg: "Login ok.",
          state: "ok",
          user: user,
          reseller: reseller,
          customers: customers,
        });
      }

      //Case hotel send user, customer (no websurfer, tickets)
      if (user.role === "HOTEL") {
        var customer = await db.getCustomerByUser(user);
        //var websurfers = db.getWebsurfersByCustomer(customer);
        //var tickets = db.getTicketsByCustomer(customer);
        res.send({
          status: "200",
          msg: "Login ok.",
          state: "ok",
          user: user,
          customer: customer,
          //websurfers: websurfers,
          //tickets: tickets,
        });
      }

      //Case user
      if (user.role === "USER") {
        //TODO
      }
    } else {
      res.send({ status: "404", msg: "Login incorrect" });
    }
  });
});

// DATA PER L'UTENTE RESELLER
routerDashboard.post("/data/dataReseller", async (req, res) => {
  res.send({
    status: "200",
    msg: "DATA",
    data: await getResellerUser(req.body.user),
  });
});

// DATA PER GLI HOTEL
routerDashboard.post("/data/datahotel", async (req, res) => {
  res.send({
    status: "200",
    msg: "DATA",
    data: await getDataUser(req.body.user),
  });
});

// INSERIMENTO WEBSURFER E RELATIVO TICKET
routerDashboard.post("/websurfers/insert", async (req, res) => {
  const generateRandomCredentials = require("../../utils/random");
  var { ticketUsername, ticketPassword } = generateRandomCredentials();
  var date = new Date();
  date.setDate(date.getDate() + 7);
  //FETCH PIN OF AGENCY
  var pinAzienda = await Customer.findOne({
    where: {
      id: req.body.user.info.CustomerId,
    },
  });
  console.log(req.body);
  await Websurfer.findOne({
    where: {
      email: req.body.payload.email,
    },
  }).then((newWebsurfer) => {
    console.log(newWebsurfer);
    if (newWebsurfer === null) {
      Websurfer.create({
        firstname: req.body.payload.firstname,
        lastname: req.body.payload.lastname,
        email: req.body.payload.email,
        note: req.body.payload.note,
        phone: req.body.payload.phone,
        CustomerId: req.body.user.info.CustomerId,
      }).then((result) => {
        if (result != null) {
          Ticket.create({
            emissionDate: Date.now(),
            firstUse: Date.now(),
            expirationDate: date,
            expirationUsageDate: date,
            durationDays: 7,
            login: ticketUsername,
            password: ticketPassword,
            pinAzienda: pinAzienda.pin,
            ResellerId: req.body.user.info.ResellerId,
            CustomerId: req.body.user.info.CustomerId,
            WebsurferId: result.id,
          }).then((newTicket) => {
            if (newTicket != null) {
              //INSERIMENTO NEL DB DEL RADIUS
              createUser(ticketUsername, ticketPassword);
              //INVIO SMS E EMAIL
              senders.sendTicketByEmail(result.email, newTicket);
              // senders.sendTicketBySms(result.phone, newTicket);

              //RISPOSTA SERVER CON IL NUOVO WEBSURFER E IL TICKET
              res.send({ status: "200", msg: "WEBSURFER INSERITO", newWebsurfer: result, newTicket: newTicket });
            } else {
              res.send({ status: "400", msg: "ERRORE NELLA CREAZIONE DEL TICKET" });
            }
          });
        } else {
          //EMAIL GIA PRESENTE NEL DATABASE
          res.send({ status: "400", msg: "" });
        }
      });
    } else {
      res.send({ status: "400", msg: "WEBSURFER GIA ESISTENTE" });
    }
  });
});
//AGGIORNAMENTO WEBSURFER
routerDashboard.post("/websurfers/update", async (req, res) => {
  Websurfer.findOne({
    where: {
      id: req.body.payload.id,
    },
  }).then((websurferToUpdate) => {
    websurferToUpdate.firstname = req.body.payload.firstname;
    websurferToUpdate.lastname = req.body.payload.lastname;
    websurferToUpdate.email = req.body.payload.email;
    websurferToUpdate.note = req.body.payload.note;
    websurferToUpdate.phone = req.body.payload.phone;
    websurferToUpdate.idSocial = req.body.payload.idSocial;
    websurferToUpdate.typeSocial = req.body.payload.typeSocial;
    websurferToUpdate.CustomerId = req.body.payload.CustomerId;
    websurferToUpdate.save().then((result) => {
      if (result !== null) {
        res.send({ status: "200", msg: "WEBSURFER SALVATO CON SUCCESSO!" });
      } else {
        res.send({ status: "400", msg: "CONTROLLA I CAMPI!" });
      }
    });
  });
});
//ELIMINAZIONE WEBSURFER
routerDashboard.post("/websurfers/delete", async (req, res) => {
  Websurfer.findOne({
    where: {
      id: req.body.payload.id,
    },
  }).then((websurferToDestroy) => {
    if (websurferToDestroy !== null) {
      websurferToDestroy.destroy();
      res.send({ status: "200", msg: "WEBSURFER ELIMINATO CON SUCCESSO!" });
    } else {
      res.send({ status: "400", msg: "ERRORE NELLA CANCELLAZIONE!" });
    }
  });
});

// USER PAGE -----------TODO
routerDashboard.get("/users", async (req, res) => {
  if (req.session.user.role == "SUPERADMIN") {
  } else if (req.session.user.role == "RESELLER") {
    userOBJ = await getResellerUser(req.session.user);

    res.render("dashboard/userPage", {
      role: req.session.user.role,
      users: userOBJ.userOfAllCustomers,
      title: "Users",
      clients: userOBJ.customerOfThisReseller,
    });
  } else if (req.session.user.role == "HOTEL") {
    userOBJ = await getDataUser(req.session.user);
    res.render("dashboard/userPage", {
      role: req.session.user.role,
      users: userOBJ.userOfAllCustomers,
      title: "Users",
      clients: userOBJ.userOfAllCustomers,
    });
  } else {
  }
});
// INSERIMENTO USER
routerDashboard.post("/users/insert", (req, res) => {
  User.findOne({
    where: {
      utente: req.body.payload.utente,
    },
  }).then(function (newUser) {
    if (newUser === null) {
      User.create({
        role: req.body.payload.role,
        utente: req.body.payload.utente,
        password: req.body.payload.password,
        ResellerId: req.body.payload.ResellerId,
        CustomerId: req.body.payload.CustomerId,
      }).then(function (result) {
        if (result != null) {
          res.send({ status: "200", msg: "UTENTE INSERITO", result: result });
        } else {
          res.send({ msg: "CONTROLLA I DATI!" });
        }
      });
    } else {
      res.send({ msg: "UTENTE GIA PRESENTE" });
    }
  });
});
//ELIMINAZIONE USER
routerDashboard.post("/users/delete", (req, res) => {
  User.findOne({
    where: {
      id: req.body.payload.id,
    },
  }).then((result) => {
    if (result !== null) {
      result.destroy();
      res.send({ status: "200", msg: "USER ELIMINATO CON SUCCESSO!" });
    } else {
      res.send({ status: "404", msg: "ERRORE NELLA CANCELLAZIONE!" });
    }
  });
});

// CUSTOMER
routerDashboard.post("/customers/insert", (req, res) => {
  Customer.findOne({
    where: {
      companyName: req.body.payload.companyName,
    },
  }).then(function (newCustomer) {
    if (newCustomer === null) {
      Customer.create({
        fiscalCode: req.body.payload.fiscalCode,
        city: req.body.payload.city,
        companyName: req.body.payload.companyName,
        email: req.body.payload.email,
        fax: req.body.payload.fax,
        addessCompany: req.body.payload.addessCompany,
        note: req.body.payload.note,
        phone: req.body.payload.phone,
        vatCode: req.body.payload.vatCode,
        web: req.body.payload.web,
        pin: req.body.payload.pin,
        defaultBandwidth: req.body.payload.defaultBandwidth,
        ResellerId: req.body.payload.ResellerId,
      }).then(function (result) {
        if (result != null) {
          res.send({ status: "200", msg: "CLIENTE INSERITO", result: result });
        } else {
          res.send({ status: "404", msg: "CONTROLLA I DATI!" });
        }
      });
    } else {
      res.send({ status: "404", msg: "UTENTE GIA ESISTENTE" });
    }
  });
});

routerDashboard.post("/customers/delete", (req, res) => {
  Customer.findOne({
    where: {
      id: req.body.payload.id,
    },
  }).then((result) => {
    if (result !== null) {
      result.destroy();
      res.send({ status: "200", msg: "CLIENTE ELIMINATO CON SUCCESSO!" });
    } else {
      res.send({ status: "404", msg: "ERRORE NELLA CANCELLAZIONE!" });
    }
  });
});
routerDashboard.post("/customers/update", async (req, res) => {
  Customer.findOne({
    where: {
      id: req.body.payload.id,
    },
  }).then((customerToUpdate) => {
    customerToUpdate.fiscalCode = req.body.payload.fiscalCode;
    customerToUpdate.city = req.body.payload.city;
    customerToUpdate.companyName = req.body.payload.companyName;
    customerToUpdate.email = req.body.payload.email;
    customerToUpdate.fax = req.body.payload.fax;
    customerToUpdate.addessCompany = req.body.payload.addessCompany;
    customerToUpdate.note = req.body.payload.note;
    customerToUpdate.phone = req.body.payload.phone;
    customerToUpdate.vatCode = req.body.payload.vatCode;
    customerToUpdate.web = req.body.payload.web;
    customerToUpdate.pin = req.body.payload.pin;
    customerToUpdate.defaultBandwidth = req.body.payload.defaultBandwidth;
    customerToUpdate.bandwidthProfiles = req.body.payload.bandwidthProfiles;
    customerToUpdate.websurferCustomFields = req.body.payload.websurferCustomFields;
    customerToUpdate.preAuthLandingPage = req.body.payload.preAuthLandingPage;
    customerToUpdate.postAuthLandingPage = req.body.payload.postAuthLandingPage;
    customerToUpdate.ResellerId = req.body.payload.ResellerId;
    customerToUpdate.save().then((result) => {
      if (result !== null) {
        res.send({ status: "200", msg: "CLIENTE SALVATO CON SUCCESSO!" });
      } else {
        res.send({ status: "400", msg: "CONTROLLA I CAMPI!" });
      }
    });
  });
});
// TICKETS
routerDashboard.post("/tickets/insert", async (req, res) => {
  var pinAzienda = await Customer.findOne({
    where: {
      id: req.body.payload.websurfer.CustomerId,
    },
  });
  var date = new Date();
  date.setDate(date.getDate() + 7);
  Ticket.create({
    emissionDate: Date.now(),
    firstUse: Date.now(),
    expirationDate: date,
    expirationUsageDate: date,
    durationDays: 7,
    login: req.body.payload.credentials.ticketUsername,
    password: req.body.payload.credentials.ticketPassword,
    pinAzienda: pinAzienda.pin,
    ResellerId: req.body.payload.operator.ResellerId,
    CustomerId: req.body.payload.operator.CustomerId,
    WebsurferId: req.body.payload.websurfer.id,
  }).then((result) => {
    if (result != null) {
      res.send({ status: "200", msg: "TICKET INSERITO CON SUCCESSO", result: result });
    } else {
      res.send({ status: "400", msg: "ERRORE NELLA CREAZIONE DEL TICKET" });
    }
  });
});
routerDashboard.post("/tickets/delete", (req, res) => {
  Ticket.findOne({
    where: {
      id: req.body.payload.id,
    },
  }).then((result) => {
    if (result !== null) {
      result.destroy();
      res.send({ status: "200", msg: "TICKET ELIMINATO CON SUCCESSO!" });
    } else {
      res.send({ status: "404", msg: "ERRORE NELLA CANCELLAZIONE!" });
    }
  });
});
module.exports = routerDashboard;
