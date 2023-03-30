const express = require('express');
const session = require('express-session');
const routerDashboard = express.Router();
const {Customer, User, Ticket, Websurfer} = require('./database');
const {Op} = require('sequelize');


const yestardayAgo = new Date();
yestardayAgo.setDate(yestardayAgo.getDate() - 3);


var fieldDate = {};

function checkSession(req, res, next) {
    if (! req.session.user) {
        res.redirect('/admin');
    } else {
        next();
    }
}

routerDashboard.get('/', (req, res) => {
    res.render('dashboard/authAdmin', {error: null});
});


routerDashboard.post('/login', (req, res) => {
    User.findOne({where: { utente: req.body.username, password:req.body.password }}).then(function (user) {
        if(user != null){
            req.session.user={
                username: user.utente,
                role: user.admin == 1 ? 'admin' : user.admin == 0 ? 'user' : 'developer'
            }
            res.redirect('dashboard');
        }else{
            res.render('dashboard/authAdmin',{error:'EMAIL O PASSWORD ERRATI!'});
        }
     
       
    })
});

routerDashboard.get('/dashboard', checkSession, async (req, res) => {
    await Ticket.count({
        where: {
            state: 'active'
        }
    }).then(count => {
        fieldDate.nTicket = count;
    });
    await Ticket.count({
        where: {
            state: 'expired'
        }
    }).then(count => {
        fieldDate.nTicketExpired = count;
    });
    Websurfer.findAll
    Websurfer.count().then(count => {
        fieldDate.nWebSurfer = count;
    });
    await Websurfer.count({
        where: {
            createdAt: {
                [Op.gte]: yestardayAgo
            }
        }
    }).then(count => {
        fieldDate.lastWebsurferInserted = count;
    });
    await Websurfer.findAll({
        where: {
            createdAt: {
                [Op.gte]: yestardayAgo
            }
        }
    }).then(function(websurfers) {
       fieldDate.lastWebsurfers= websurfers;
      
    });
    await Ticket.findAll({
        where: {
            createdAt: {
                [Op.gte]: yestardayAgo
            }
        }
    }).then(function(tickets) {
       fieldDate.lastTickets= tickets;
      
    });
    console.log(req.session.user);
    res.render('dashboard/home', {
        user: req.session.user,
        data: fieldDate
    });
});


routerDashboard.get('/customers', checkSession, (req, res) => {
    Customer.findAll().then(function (customers) {
        if (customers) {
            res.render('dashboard/clientPage', {customers: customers});
        } else {
            res.render('dashboard/clientPage');
        }
    });
});

routerDashboard.post('/customers/insert', checkSession, (req, res) => {
    Customer.findOne({
        where: {
            companyName: req.body.companyName
        }
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
                profile: req.body.profile,
                defaultBandwidth: req.body.defaultBandwidth
            }).then(function (y) {
                if (y !== null) {
                    res.redirect('/admin/customers');
                } else {
                    res.redirect('/admin/customers');
                }
            })
        } else {
            res.send("PROBLEMA A CARICARE LE RISORSE DEL SERVER")
        }
    })
})


routerDashboard.get('/users', checkSession, (req, res) => {


    User.findAll().then(function (users) {
        if (users) {
            res.render('dashboard/userPage', {users: users});
        } else {
            res.render('dashboard/userPage');
        }
    });
});
routerDashboard.post('/users/insert', checkSession, (req, res) => {
    User.findOne({
        where: {
            utente: req.body.username
        }
    }).then(function (newUser) {
        if (newUser === null) {
            User.create({utente: req.body.username, password: req.body.password, admin: req.body.role}).then(function (x) {
                if (x !== null) {
                    res.redirect('/admin/users');

                } else {
                    res.redirect('/users?status=ko');
                }

            })
        } else {
            res.redirect('/users?status=credentials');

        }
    });
});


routerDashboard.get('/tickets', checkSession, (req, res) => {
    Ticket.findAll().then(function (tickets) {
        if (tickets) {

            res.render('dashboard/ticketPage', {tickets: tickets});
        } else {
            res.render('dashboard/ticketPage');
        }
    });
});
routerDashboard.post('/ticket/insert', checkSession, (req, res) => {
    console.log(req.body);
    /*   Ticket.findAll().then(function (tickets) {
        if (tickets) {
          
            res.render('dashboard/ticketPage',{tickets: tickets});
        } else {
            res.render('dashboard/ticketPage');
        }
    }); */
});
routerDashboard.get('/radius', checkSession, (req, res) => {
    res.render('dashboard/radiusPage');
});


module.exports = routerDashboard;
