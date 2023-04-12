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

    const customerOfThisReseller = await Customer.findAll({
        where: {
            ResellerId: userLogged.resellerID
        }
    });
    userOBJ.customerOfThisReseller = customerOfThisReseller || null;

    const websurfers = await Websurfer.findAll({
        include: [
          {
            model: Customer,
            where: {
              ResellerId: userLogged.resellerID,
            },
          },
        ],
      });
    userOBJ.websurfers = websurfers || null;

    const ticketsOfAllCustomers = await Ticket.findAll({
        include: [
          {
            model: Customer,
            where: {
              ResellerId: userLogged.resellerID,
            },
          },
        ],
      });
      userOBJ.ticketsOfAllCustomers = ticketsOfAllCustomers || null;

      const userOfAllCustomers = await User.findAll({
        include: [
          {
            model: Customer,
            where: {
              ResellerId: userLogged.resellerID,
            },
          },
        ],
      });
      userOBJ.userOfAllCustomers = userOfAllCustomers || null;

    return userOBJ;
}

module.exports = getResellerUser;
