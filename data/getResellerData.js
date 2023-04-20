const {Op} = require('sequelize');
const {
    Websurfer,
    User,
    Ticket,
    Reseller,
    Customer
} = require('../database');
const yestardayAgo = new Date();
yestardayAgo.setDate(yestardayAgo.getDate() - 3);


async function getResellerUser(userLogged) {
    const userOBJ = {};
  //TUTTI I CLIENTI DEL RESELLER
    const customerOfThisReseller = await Customer.findAll({
        where: {
            ResellerId: userLogged.ResellerId
        }
    });
    userOBJ.customerOfThisReseller = customerOfThisReseller || null;
    //TUTTI I WEBSURFER DI TUTTI I CLIENTI DEL RESELLER
    const websurfers = await Websurfer.findAll({
        include: [
            {
                model: Customer,
                where: {
                    ResellerId: userLogged.ResellerId
                }
            },
        ]
    });
    userOBJ.websurfers = websurfers || null;
    //TUTTI I TICKET DI TUTTI I CLIENTI DEL RESELLER
    const ticketsOfAllCustomers = await Ticket.findAll({
        include: [
            {
                model: Customer,
                where: {
                    ResellerId: userLogged.ResellerId
                }
            },
        ]
    });
    userOBJ.ticketsOfAllCustomers = ticketsOfAllCustomers || null;

    // TUTTI GLI UTENTI DI TUTTI I CLIENTI DI QUESTO RESELLER
    const userOfAllCustomers = await User.findAll({
        include: [
            {
                model: Customer,
                where: {
                    ResellerId: userLogged.ResellerId
                }
            },
        ]
    });
    userOBJ.userOfAllCustomers = userOfAllCustomers || null;

    // ULTIMI WEBSURFER INSERITI DEI CLIENTI DEL WEBSURFER (3 GIORNI)
    const lastWebsurfers = await Websurfer.findAll({
      where:{
        createdAt: {
          [Op.gte]: yestardayAgo
      }
      },
      include: [
        {
            model: Customer,
            where: {
                ResellerId: userLogged.ResellerId,
            }
        },
    ]
    });
    userOBJ.lastWebsurfers = lastWebsurfers || null;
    // ULTIMI TICKET INSERITI DAI CLIENTI DEL RESELLER (3 GIORNI)
    const lastTickets = await Ticket.findAll({
        where: {
            createdAt: {
              [Op.gte]: yestardayAgo,
            },
          },
        include: [
          {
            model: Customer,
            where: {
              ResellerId: userLogged.ResellerId,
            },
          },
        ],
        
      });
    userOBJ.lastTickets = lastTickets || null;
    // TICKET ATTIVI DI TUTTI I CLIENTI
    const activeTickets = await Ticket.findAll({
      where:{
        state: 'active',
      },
      include: [
        {
            model: Customer,
            where: {
                ResellerId: userLogged.ResellerId,
            }
        },
    ]
        
    });
    userOBJ.activeTickets = activeTickets || 0;
    // TICKET SCADUTI DI TUTTI I CLIENTI
    const expiredTickets = await Ticket.findAll({
      where:{
        state: 'expired',
      },
      include: [
        {
            model: Customer,
            where: {
                ResellerId: userLogged.ResellerId,
            }
        },
    ],
    
    });
    userOBJ.expiredTickets = expiredTickets || 0;

    return userOBJ;
}

module.exports = getResellerUser;
