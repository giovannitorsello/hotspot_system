const express = require("express");
const session = require("express-session");
const {
    Customer,
    User,
    Ticket,
    Websurfer,
    Reseller
} = require("../database");
const {Op} = require('sequelize');
const menuMiddleware = require("../utils/menu");
const routerDashboard = express.Router();
const generateRandomCredentials = require("../utils/random");
const {ticketUsername, ticketPassword} = generateRandomCredentials();
var randomPin = require("../frontend/src/utils/randomPin");
var getDataUser = require("../data/getDataUser");
const Swal = require('sweetalert2');
var getResellerUser = require("../data/getResellerData");
var userOBJ;
var dataCreationTicker = {};


function checkSession(req, res, next) {
    if (! req.session.user) {
        res.redirect("/admin");
    } else {
        next();
    }
}

// AUTH PAGE
routerDashboard.get("/", (req, res) => {
    res.render("dashboard/authAdmin", {error: null});
});

routerDashboard.post("/login", (req, res) => {
    User.findOne({
        where: {
            utente: req.body.username,
            password: req.body.password
        }
    }).then(function (user) {
        if (user != null) {
            dataCreationTicker.user = user;
            req.session.user = {
                username: user.utente,
                role: user.role,
                customerID: user.CustomerId,
                resellerID: user.ResellerId
            };


            res.send({status: "200", msg: "USER FOUND", user: user});
        } else {
            res.send({status: "404", msg: "Credenziali errate"});
            /*  res.render("dashboard/authAdmin", { error: "EMAIL O PASSWORD ERRATI!" }); */
        }
    });
});

routerDashboard.post("/data/dataReseller", async (req, res) => {
    res.send({
        status: "200",
        msg: "DATA",
        data: await getResellerUser(req.body.user)
    });
});

// HOME PAGE
routerDashboard.get("/dashboard", checkSession, menuMiddleware, async (req, res) => {
    console.log(req.session.user);
    if (req.session.user.role == "SUPERADMIN") {} else if (req.session.user.role == "RESELLER") {
        userOBJ = await getResellerUser(req.session.user);
        res.render("dashboard/home", {
            user: req.session.user,
            title: "Home",
            data: userOBJ
        });
    } else if (req.session.user.role == "HOTEL") {
        userOBJ = await getDataUser(req.session.user);
        res.render("dashboard/home", {
            user: req.session.user,
            title: "Home",
            data: userOBJ
        });
    } else {}
});

// WEBSURFER PAGE
routerDashboard.get("/websurfers", checkSession, menuMiddleware, async (req, res) => {
    if (req.session.user.role == "SUPERADMIN") {} else if (req.session.user.role == "RESELLER") {
        userOBJ = await getResellerUser(req.session.user);
        console.log(userOBJ);
        res.render("dashboard/webSurferPage", {
            title: "Websurfer",
            websurfers: userOBJ.websurfers
        });
    } else if (req.session.user.role == "HOTEL") {
        userOBJ = await getDataUser(req.session.user);
        res.render("dashboard/webSurferPage", {
            title: "Websurfer",
            websurfers: userOBJ.websurfers
        });
    } else {}
});

routerDashboard.post("/websurfers/insert", (req, res) => {
    Websurfer.findOne({
        where: {
            email: req.body.payload.email
        }
    }).then(function (newWebsurfer) {
        if (newWebsurfer === null) {
            Websurfer.create({
                firstname: req.body.payload.firstname,
                lastname: req.body.payload.lastname,
                email: req.body.payload.email,
                note: req.body.payload.note,
                phone: req.body.payload.phone,
                CustomerId: req.body.payload.CustomerId
            }).then(function (result){
                if (result != null) {
                    res.send({status: "200", msg: "WEBSURFER INSERITO", result:result});
                } else {
                    res.send({status: "404", msg: "CONTROLLA I DATI!"});
                }
            });
        } else {
            res.send("PROBLEMA A CARICARE LE RISORSE DEL SERVER");
        }
    });
});

routerDashboard.post("/websurfers/update", async (req, res) => {
    console.log(req.body);
    Websurfer.findOne({
        where: {
            id: req.body.payload.id
        }
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
                res.send({status: "200", msg: "WEBSURFER SALVATO CON SUCCESSO!"});
            } else {
                res.send({status: "400", msg: "CONTROLLA I CAMPI!"});
            }
        });
    }) 
});
routerDashboard.post("/websurfers/delete", async (req, res) => {
    Websurfer.findOne({
        where: {
            id: req.body.payload.id
        }
    }).then((websurferToDestroy) => {
        if (websurferToDestroy !== null) {
            websurferToDestroy.destroy();
            res.send({status: "200", msg: "WEBSURFER ELIMINATO CON SUCCESSO!"});
        } else {
            res.send({status: "400", msg: "ERRORE NELLA CANCELLAZIONE!"});
        }
    })
})

// RESELLER PAGE -------- TODO
routerDashboard.get("/resellers", checkSession, menuMiddleware, (req, res) => {
    Reseller.findAll().then(function (resellers) {
        if (resellers) {
            res.render("dashboard/resellerPage", {
                resellers: resellers,
                title: "Reseller"
            });
        } else {
            res.render("dashboard/webSurferPage", {
                title: "Reseller",
                resellers: resellers
            });
        }
    });
});

// USER PAGE -----------TODO
routerDashboard.get("/users", checkSession, menuMiddleware, async (req, res) => {
    if (req.session.user.role == "SUPERADMIN") {} else if (req.session.user.role == "RESELLER") {
        userOBJ = await getResellerUser(req.session.user);
        console.log(userOBJ);
        res.render("dashboard/userPage", {
            role: req.session.user.role,
            users: userOBJ.userOfAllCustomers,
            title: "Users",
            clients: userOBJ.customerOfThisReseller
        });
    } else if (req.session.user.role == "HOTEL") {
        userOBJ = await getDataUser(req.session.user);
        res.render("dashboard/userPage", {
            role: req.session.user.role,
            users: userOBJ.userOfAllCustomers,
            title: "Users",
            clients: userOBJ.userOfAllCustomers
        });
    } else {}

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

routerDashboard.post("/users/insert", (req, res) => {
    console.log(req.body);
    User.findOne({
        where: {
            utente: req.body.payload.utente
        }
    }).then(function (newUser) {
        if (newUser === null) {
            User.create({
                role: req.body.payload.role,
                utente: req.body.payload.utente,
                password: req.body.payload.password,
                ResellerId: req.body.payload.ResellerId,
                CustomerId: req.body.payload.CustomerId
            }).then(function (result) {
                if (result != null) {
                    res.send({status: "200", msg: "UTENTE INSERITO", result:result});
                } else {
                    res.send({msg: "CONTROLLA I DATI!"});
                }
            });
        } else {
            res.send({msg: "UTENTE GIA PRESENTE"});
        }
    }); 
});

// CUSTOMER
routerDashboard.get("/customers", checkSession, menuMiddleware, async (req, res) => {
    if (req.session.user.role == "SUPERADMIN") {} else if (req.session.user.role == "RESELLER") {
        userOBJ = await getResellerUser(req.session.user);

        res.render("dashboard/clientPage", {
            customers: userOBJ.customerOfThisReseller,
            title: "Customers",
            randomPin: randomPin
        });
    } else if (req.session.user.role == "HOTEL") {
        userOBJ = await getDataUser(req.session.user);
        res.render("dashboard/clientPage", {
            customers: userOBJ.customerOfThisReseller,
            title: "Customers",
            randomPin: randomPin
        });
    } else {}
});
routerDashboard.post("/customers/insert", (req, res) => {
    Customer.findOne({
        where: {
            companyName: req.body.payload.companyName
        }
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
                ResellerId: req.body.payload.ResellerId
            }).then(function (result) {
                if (result != null) {
                    res.send({status: "200", msg: "CLIENTE INSERITO", result:result});
                } else {
                    res.send({status: "404", msg: "CONTROLLA I DATI!"});
                }
            });
        } else {
            res.send({status: "404", msg: "UTENTE GIA ESISTENTE"});
        }
    });
});
routerDashboard.post("/customers/delete", (req,res) =>{
     Customer.findOne({where:{id: req.body.payload.id}}).then((result)=>{
        if(result !== null){
            result.destroy();
            res.send({
                status: "200",
                msg: "CLIENTE ELIMINATO CON SUCCESSO!",
              });
        }else{
            res.send({
                status: "404",
                msg: "ERRORE NELLA CANCELLAZIONE!",
              });
        }
    }) 
});
routerDashboard.post("/customers/update", async (req, res) => {
    Customer.findOne({
        where: {
            id: req.body.payload.id
        }
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
        customerToUpdate.ResellerId = req.body.payload.ResellerId;
        customerToUpdate.save().then((result) => {
            if (result !== null) {
                res.send({status: "200", msg: "CLIENTE SALVATO CON SUCCESSO!"});
            } else {
                res.send({status: "400", msg: "CONTROLLA I CAMPI!"});
            }
        });
    })
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
                dataCreationTicker: dataCreationTicker
            });
        } else {
            res.render("dashboard/ticketPage", {
                title: "Tickets",
                username: ticketUsername,
                password: ticketPassword,
                dataCreationTicker: dataCreationTicker
            });
        }
    });
});

routerDashboard.post("/ticket/insert", checkSession, (req, res) => {
    // console.log(req.body);
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
    res.render("dashboard/radiusPage", {title: "Radius"});
});

module.exports = routerDashboard;
