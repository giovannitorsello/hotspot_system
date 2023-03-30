const express = require('express');
const session = require('express-session');
const router = express.Router();
const passport = require('passport');
const {Websurfer, Ticket} = require('./database');
const generateRandomCredentials = require("./utils/random");
const {ticketUsername, ticketPassword} = generateRandomCredentials();
const createUser = require("./utils/radiusDB");
const dateUtils = require('./utils/dateUtils');

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

router.get('/register', function (req, res) {
    res.render('pages/register', {error: null});
});

router.post('/auth/register', (req, res) => {
    console.log(req.body);
    Websurfer.findOne({
        where: {
            email: req.body.email
        }
    }).then(resultIfExist => {
        if (resultIfExist == null) {
            Websurfer.create({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phone: req.body.phone}).then(resultCreation => {
                if (resultCreation != null) {
                    Ticket.findOne({
                        where: {
                            login: ticketUsername
                        }
                    }).then(resultIfTicketExist => {
                        if (resultIfTicketExist == null) {
                            createUser(ticketUsername, ticketPassword);
                            Ticket.create({
                                emissionDate: dateUtils.formatCurrentDate(),
                                firstUse: dateUtils.formatCurrentDate(),
                                expirationDate: dateUtils.addDays(dateUtils.formatCurrentDate()),
                                expirationUsageDate: dateUtils.addDays(dateUtils.formatCurrentDate()),
                                durationDays: dateUtils.calculateRemainingDays(dateUtils.addDays(dateUtils.formatCurrentDate())),
                                login: ticketUsername,
                                note: '',
                                password: ticketPassword,
                                serialNumber: device.mac,
                                state: 'active',
                                profile: '',
                                WebsurferId: resultCreation.id,
                                CustomerId: device.pin
                            }).then(resultCreationTicket => {
                                if (resultCreationTicket != null) {
                                    res.render('pages/successLogin', {
                                        username: ticketUsername,
                                        password: ticketPassword,
                                        device: device
                                    });
                                } else {  console.log('ERRORE CREAZIONE TICKET');
                                }
                            })
                        } else { console.log('TICKET ESISTENTE');
                        }
                    })
                } else { console.log('ERRORE CREAZIONE WEBSURFER');
                }

            })
        } else { console.log('UTENTE GIA ESISTENTE');
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
    Websurfer.create({
        firstname: userProfile._json.given_name,
        lastname: userProfile._json.family_name,
        email: userProfile._json.email,
        phone: '000000000',
        idSocial: userProfile.id,
        typeSocial: 'GOOGLE'
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
});

/* router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['profile', 'email']}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect:'/error'}), function (req,res){
    res.send(userProfileFacebook);
})
 */

router.get('/success', (req, res) => {
    res.render('pages/success', {socialUser: userProfile});
});

router.get('/error', (req, res) => res.send("error logging in"));


module.exports = router;
