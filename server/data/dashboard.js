const {Customer, User, Ticket, Websurfer, Reseller} = require('../database');
const {Op} = require('sequelize');
const yestardayAgo = new Date();

var dataTables ={};


//TABELLA RESELLER
Reseller.findAll().then(function(resellers){
    if(resellers){
        dataTables.reseller = resellers;
    }else{
        console.log(resellers);
    }
});

//TABELLA ULTIMI UTENTI INSERITI
yestardayAgo.setDate(yestardayAgo.getDate() - 3);

Websurfer.count({
    where: {
        createdAt: {
            [Op.gte]: yestardayAgo
        }
    }
}).then(count => {
    dataTables.lastUserInserted = count;
});

//TUTTI GLI UTENTI
Websurfer.findAll
Websurfer.count().then(count => {
    dataTables.totWebsurfer = count;
});

//TICKET ATTIVI
/*  Ticket.count({
    where: {
        state: 'active'
    }
}).then(count => {
    dataTables.nTicket = count;
}); */

//TICKET SCADUTI
/*  Ticket.count({
    where: {
        state: 'expired'
    }
}).then(count => {
    dataTables.nTicketExpired = count;
});  */
//ULTIMI TICKET CREATI 
/*  Ticket.findAll({
    where: {
        createdAt: {
            [Op.gte]: yestardayAgo
        }
    }
}).then(function(tickets) {
    dataTables.lastTickets= tickets;
  
});
 */



module.exports = dataTables
  


