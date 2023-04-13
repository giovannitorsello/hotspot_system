const express = require("express");
const session = require("express-session");
const { Customer, User, Ticket, Websurfer, Reseller } = require("../database");
const menuMiddleware = require("../utils/menu");
const routerDashboard = express.Router();
const generateRandomCredentials = require("../utils/random");
const { ticketUsername, ticketPassword } = generateRandomCredentials();
var randomPin = require("../utils/randomPin");
var getDataUser = require("../data/getDataUser");
const Swal = require('sweetalert2')
var userOBJ;
var dataCreationTicker = {};
var getResellerUser = require("../data/getResellerData");

function checkSession(req, res, next) {
  if (!req.session.user) {
    res.redirect("/admin");
  } else {
    next();
  }
}

// AUTH PAGE
routerDashboard.get("/", (req, res) => {
  res.render("dashboard/authAdmin", { error: null });
});

routerDashboard.post("/login", (req, res) => {
  User.findOne({
    where: {
      utente: req.body.username,
      password: req.body.password,
    },
  }).then(function (user) {
    if (user != null) {
      dataCreationTicker.user = user;
      req.session.user = {
        username: user.utente,
        role: user.role,
        customerID: user.CustomerId,
        resellerID: user.ResellerId,
      };

     
      res.send({
      status:"200",
      msg: "USER FOUND",
      user: user
      });
    } else {
      res.send({
        status:"404",
        msg: "Credenziali errate",
        });
     /*  res.render("dashboard/authAdmin", { error: "EMAIL O PASSWORD ERRATI!" }); */
    }
  }); 
});

// HOME PAGE
routerDashboard.get("/dashboard", checkSession, menuMiddleware, async (req, res) => {
  console.log(req.session.user);
  if (req.session.user.role == "SUPERADMIN") {
  } else if (req.session.user.role == "RESELLER") {
    userOBJ = await getResellerUser(req.session.user);
    res.render("dashboard/home", {
      user: req.session.user,
      title: "Home",
      data: userOBJ,
    });
  } else if (req.session.user.role == "HOTEL") {
    userOBJ = await getDataUser(req.session.user);
    res.render("dashboard/home", {
      user: req.session.user,
      title: "Home",
      data: userOBJ,
    });
  } else {
  }
});

// WEBSURFER PAGE
routerDashboard.get("/websurfers", checkSession, menuMiddleware, async (req, res) => {
  if (req.session.user.role == "SUPERADMIN") {
  } else if (req.session.user.role == "RESELLER") {
    userOBJ = await getResellerUser(req.session.user);
    console.log(userOBJ);
    res.render("dashboard/webSurferPage", {
      title: "Websurfer",
      websurfers: userOBJ.websurfers,
    });
  } else if (req.session.user.role == "HOTEL") {
    userOBJ = await getDataUser(req.session.user);
    res.render("dashboard/webSurferPage", {
      title: "Websurfer",
      websurfers: userOBJ.websurfers,
    });
  } else {
  }
});

routerDashboard.post("/websurfers/insert", checkSession, menuMiddleware, (req, res) => {
  Websurfer.findOne({
    where: {
      email: req.body.email,
    },
  }).then(function (newWebsurfer) {
    if (newWebsurfer === null) {
      Websurfer.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        note: req.body.note,
        phone: req.body.phone,
        CustomerId: req.session.customerID,
      }).then(function (y) {
        if (y !== null) {
          res.redirect("/admin/websurfers");
        } else {
          res.redirect("/admin/websurfers");
        }
      });
    } else {
      res.send("PROBLEMA A CARICARE LE RISORSE DEL SERVER");
    }
  });
});

// RESELLER PAGE -------- TODO
routerDashboard.get("/resellers", checkSession, menuMiddleware, (req, res) => {
  Reseller.findAll().then(function (resellers) {
    if (resellers) {
      res.render("dashboard/resellerPage", {
        resellers: resellers,
        title: "Reseller",
      });
    } else {
      res.render("dashboard/webSurferPage", {
        title: "Reseller",
        resellers: resellers,
      });
    }
  });
});

// USER PAGE -----------TODO
routerDashboard.get("/users", checkSession, menuMiddleware, async (req, res) => {
  if (req.session.user.role == "SUPERADMIN") {
  } else if (req.session.user.role == "RESELLER") {
    userOBJ = await getResellerUser(req.session.user);
    console.log(userOBJ);
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

  /*  User.findAll().then(function (users) {
        if (users) {
            res.render('dashboard/userPage', {
                users: users,
                title: 'Users',
                clients: clients
            });
        } else {
            res.render('dashboard/userPage', {
                title: 'Users',
                clients: clients
            });
        }
    }); */
});

routerDashboard.post("/users/insert", checkSession, (req, res) => {
  User.findOne({
    where: {
      utente: req.body.username,
    },
  }).then(function (newUser) {
    if (newUser === null) {
      User.create({
        role: req.body.role,
        utente: req.body.username,
        password: req.body.password,
        ResellerId: req.session.user.resellerID,
        CustomerId: req.body.client,
      }).then(function (x) {
        if (x !== null) {
          res.redirect("/admin/users");
        } else {
          res.redirect("/users?status=ko");
        }
      });
    } else {
      res.redirect("/users?status=credentials");
    }
  });
});

// CUSTOMER
routerDashboard.get("/customers", checkSession, menuMiddleware, async (req, res) => {
  if (req.session.user.role == "SUPERADMIN") {
  } else if (req.session.user.role == "RESELLER") {
    userOBJ = await getResellerUser(req.session.user);
    
    res.render("dashboard/clientPage", {
      customers: userOBJ.customerOfThisReseller,
      title: "Customers",
      randomPin: randomPin,
    });
  } else if (req.session.user.role == "HOTEL") {
    userOBJ = await getDataUser(req.session.user);
    res.render("dashboard/clientPage", {
      customers: userOBJ.customerOfThisReseller,
      title: "Customers",
      randomPin: randomPin,
    });
  } else {
  }
});

routerDashboard.post("/customers/insert", checkSession, menuMiddleware, (req, res) => {
  Customer.findOne({
    where: {
      companyName: req.body.companyName,
    },
  }).then(function (newCustomer) {
    if (newCustomer === null) {
      Customer.create({
        fiscalCode: req.body.fiscalCode,
        city: req.body.city,
        companyName: req.body.companyName,
        email: req.body.email,
        fax: req.body.fax,
        addessCompany: req.body.addessCompany,
        note: req.body.note,
        phone: req.body.phone,
        vatCode: req.body.vatCode,
        web: req.body.web,
        pin: req.body.pin,
        defaultBandwidth: req.body.defaultBandwidth,
        ResellerId: req.session.user.resellerID,
      }).then(function (result) {
        if (result !== null) {
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
          res.redirect("/admin/customers");
        } else {
          res.redirect("/admin/customers");
        }
      });
    } else {
      res.send("PROBLEMA A CARICARE LE RISORSE DEL SERVER");
    }
  });
});

// TICKETS
routerDashboard.get("/tickets", checkSession, menuMiddleware, (req, res) => {
  Ticket.findAll().then(function (tickets) {
    if (tickets) {
      res.render("dashboard/ticketPage", {
        tickets: tickets,
        title: "Tickets",
        username: ticketUsername,
        password: ticketPassword,
        dataCreationTicker: dataCreationTicker,
      });
    } else {
      res.render("dashboard/ticketPage", {
        title: "Tickets",
        username: ticketUsername,
        password: ticketPassword,
        dataCreationTicker: dataCreationTicker,
      });
    }
  });
});

routerDashboard.post("/ticket/insert", checkSession, (req, res) => {
  //console.log(req.body);
  /*   Ticket.findAll().then(function (tickets) {
            if (tickets) {
              
                res.render('dashboard/ticketPage',{tickets: tickets});
            } else {
                res.render('dashboard/ticketPage');
            }
        }); */
});

// RADIUS
routerDashboard.get("/radius", checkSession, menuMiddleware, (req, res) => {
  res.render("dashboard/radiusPage", { title: "Radius" });
});

module.exports = routerDashboard;
