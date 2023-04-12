const express = require('express');
const session = require('express-session');
const router = express.Router();
const passport = require('passport');
const {Websurfer, Ticket, Customer} = require('../database');
const generateRandomCredentials = require("../utils/random");
const {ticketUsername, ticketPassword} = generateRandomCredentials();
const createUser = require("../utils/radiusDB");
const dateUtils = require('../utils/dateUtils');
const axios = require('axios');
const Swal = require('sweetalert2')
var customer = {};
var device = {};

router.use(session({resave: false, saveUninitialized: true, secret: 'secret'}));

router.get('/', function (req, res) {
    res.render('pages/auth');
});

router.post('/', (req, res) => {
    res.render('pages/auth');
    device = req.body;
    console.log(device);
});

router.get('/login', function (req, res) {
    res.render('pages/login_sms');
});

router.get('/register', function (req, res) {
    res.render('pages/register');
});

router.post('/auth/register', async (req, res) => {
    console.log(req.body);
    console.log(device);

    await Customer.findOne({
        where: {
            pin: device.pin
        }
    }).then(customerOfThisTicket => {
        customer = customerOfThisTicket;
    })
    console.log(customer);


    await Websurfer.findOne({
        where: {
            email: req.body.email
        }
    }).then(resultIfExist => {
        if (resultIfExist == null) {
            Websurfer.create({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phone: req.body.phone}).then(resultCreation => {
                if (resultCreation != null) { // definisci l'URL
                    const url = "http://wifiticket.wifinetcom.net:8080/WIFITicketSystem2/TicketServlet?action=get_ticket_sms&pin=1111&nome=" +
                      req.body.firstName +
                      "&cognome=" +
                      req.body.lastName +
                      "&phone=" +
                      req.body.phone +
                      "&email=" +
                      req.body.email +
                      "&days=7";
                    
                    const data = {};
                    
                    axios.post(url, data)
                      .then((response) => {
                        // gestisce la risposta qui
                        console.log(response.data);
                      })
                      .catch((error) => {
                        // gestisce eventuali errori qui
                        console.error(error);
                      });
                    
                }
            })
        }
    })
});

router.get('/auth/success', (req, res) => {

    res.render('pages/successLogin', {
        username: ticketUsername,
        password: ticketPassword
    });
})


router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/error'}), function (req, res) {
    Websurfer.findOne({where:{email: userProfile._json.email}}).then(socialUser=>{
        if(socialUser == null){
            Websurfer.create({
                firstname: userProfile._json.given_name,
                lastname: userProfile._json.family_name,
                email: userProfile._json.email,
                phone: '000000000',
                idSocial: userProfile.id,
                typeSocial: 'GOOGLE',
                CustomerId: customer.id
            }).then((newWebsurfer) => {
                if (newWebsurfer) {
                    createUser(ticketUsername, ticketPassword);
                    res.render('pages/successLogin', {
                        username: ticketUsername,
                        password: ticketPassword
                    });
                    /* res.redirect("http://10.10.10.178/hotspot/login.html"); */
                } else {
                    res.send("ERRORE CREAZIONE");
                }
            }).catch((error) => {
                res.send(error);
            })
        }else{
            console.log("ESISTE GIA");
            res.render('pages/auth');
        }
    })
    
});

router.get('/auth/facebook', passport.authenticate('facebook'));


router.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/error'}), function (req, res) {
    Websurfer.create({
        firstname: userProfileFacebook.displayName,
        lastname: '',
        email: '',
        phone: '000000000',
        idSocial: userProfileFacebook.id,
        typeSocial: 'FACEBOOK',
        CustomerId:customer.id
    }).then((newWebsurfer) => {
        if (newWebsurfer) {
            createUser(ticketUsername, ticketPassword);
            res.render('pages/successLogin', {
                username: ticketUsername,
                password: ticketPassword
            });

        } else {
            res.send("ERRORE CREAZIONE");
        }
    }).catch((error) => {
        res.send(error);
    })
});

router.get('/success', (req, res) => {
    res.render('pages/success', {socialUser: userProfile});
});

router.get('/error', (req, res) => res.send("error logging in"));


module.exports = router;
