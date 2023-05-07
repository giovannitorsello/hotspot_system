const {Op} = require('sequelize');
const {Websurfer, User, Ticket, Reseller, Customer} = require('../database');
const yestardayAgo = new Date();
yestardayAgo.setDate(yestardayAgo.getDate() - 3);


async function getDataUser(userLogged) {
    const userOBJ = {};

    const websurfers = await Websurfer.findAll({
        where: {
            CustomerId: userLogged.CustomerId
        }
    });
    userOBJ.websurfers = websurfers || 0;

    const tickets = await Ticket.findAll({
        where:{
            CustomerId:userLogged.CustomerId
        }
    })
    userOBJ.tickets = tickets || 0;

    
    /* const activeTickets = await Ticket.findAll({
        where: {
            state: 'active',
            CustomerId: userLogged.customerID
        }
    });
    userOBJ.activeTickets = activeTickets || 0;

    const expiredTickets = await Ticket.findAll({
        where: {
            state: 'expired',
            CustomerId: userLogged.customerID
        }
    });
    userOBJ.expiredTickets = expiredTickets || 0;

    const lastWebsurfers = await Websurfer.findAll({
        where: {
            CustomerId: userLogged.customerID,
            createdAt: {
                [Op.gte]: yestardayAgo
            }
        }
    });
    userOBJ.lastWebsurfers = lastWebsurfers.length ? lastWebsurfers : 'NESSUN UTENTE AGGIUNTO DI RECENTE';

    const lastTickets = await Ticket.findAll({
        where: {
            CustomerId: userLogged.customerID,
            createdAt: {
                [Op.gte]: yestardayAgo
            }
        }
    });
    userOBJ.lastTickets = lastTickets.length ? lastTickets : 'NESSUN TICKET AGGIUNTO DI RECENTE';

    const userOfAllCustomers = await User.findAll({
            where: {
                CustomerId: userLogged.customerID,
            },
      });
      userOBJ.userOfAllCustomers = userOfAllCustomers || ''; */

    return userOBJ;
}

module.exports = getDataUser;
