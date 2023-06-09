const { Sequelize, QueryTypes, Op } = require("sequelize");
var config = require("./config.js").load();
const createRadiusUser = require("./utils/radiusDB");
const senders = require("./utils/senders");

const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: config.database.dialect,
});

const Websurfer = sequelize.define(
  "Websurfer",
  {
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    note: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    idSocial: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    typeSocial: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { tableName: "websurfer" }
);

const Customer = sequelize.define(
  "Customer",
  {
    fiscalCode: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    fax: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    addressCompany: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    note: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    vatCode: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    web: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { tableName: "customer" }
);

const Reseller = sequelize.define(
  "Reseller",
  {
    fiscalCode: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    fax: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    addressCompany: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    note: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    vatCode: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    web: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  
  },
  { tableName: "reseller" }
);

const User = sequelize.define(
  "User",
  {
    firstname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    role: {
      type: Sequelize.ENUM("SUPERADMIN", "RESELLER", "CUSTOMER"),
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { tableName: "user" }
);

const Device = sequelize.define(
  "Device",
  {
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    addressSetup: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ipv4Management: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ipv6Management: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    api_key: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    deviceAuthProperties: {
      //Contains alla auth data, management ports, js drivers plugin etc
      type: Sequelize.JSON,
      get: function () {
        var value = this.getDataValue("deviceAuthProperties");
        if (typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch (error) {
            console.log("Parse JSON deviceAuthproperties error.");
            return {};
          }
        }
        if (typeof value === "object") {
          return value;
        } else return {};
      },
      allowNull: true,
    },
    bandwidthProfiles: {
      type: Sequelize.JSON,
      get: function () {
        var value = this.getDataValue("bandwidthProfiles");
        if (typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch (error) {
            console.log("Parse JSON bandwidthProfiles error.");
            return {};
          }
        }
        if (typeof value === "object") {
          return value;
        } else return {};
      },
      allowNull: true,
    },
    websurferCustomFields: {
      type: Sequelize.JSON,
      get: function (value) {
        var value = this.getDataValue("websurferCustomFields");
        if (typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch (error) {
            console.log("Parse JSON websurferCustomFields error.");
            return {};
          }
        }
        if (typeof value === "object") {
          return value;
        } else return {};
      },
      allowNull: true,
    },
    preAuthLandingPage: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    postAuthLandingPage: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    notes: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  { tableName: "device" }
);

const Ticket = sequelize.define(
  "Ticket",
  {
    emissionDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    firstUse: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    expirationDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    expirationUsageDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    durationDays: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    bandwidthProfile: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    note: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    serialNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { tableName: "ticket" }
);

Reseller.hasMany(Customer);
Reseller.hasMany(Ticket);
Reseller.hasMany(User);
Reseller.hasMany(Websurfer);
Websurfer.belongsTo(Reseller);
User.belongsTo(Reseller);
Reseller.hasMany(Device);
Customer.hasMany(Device);
Customer.hasMany(Ticket);
Customer.hasMany(User);
Customer.hasMany(Websurfer);
Websurfer.hasOne(Ticket);
Websurfer.belongsTo(Customer);
Ticket.belongsTo(Customer);
User.belongsTo(Customer);
Ticket.belongsTo(Websurfer);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connessione al database avvenuta con successo.");
  } catch (error) {
    console.error("Errore durante la connessione al database:", error);
  }
};

const syncModels = async () => {
  try {
    await sequelize.sync({ force: false, alter: false });
    console.log("Sincronizzazione con il database avvenuta con successo.");
  } catch (error) {
    console.error("Errore durante la sincronizzazione con il database:", error);
  }
};

const resumeExpiredTicket = async (ticket, durationDays) => {
  var emissionDate = new Date();
  var expirationDate = new Date();
  var expirationUsageDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + durationDays);
  expirationUsageDate.setDate(expirationDate.getDate() + 730); //scadenza dopo due anni circa

  ticket.state = "active";
  ticket.durationDays = durationDays;
  ticket.emissionDate = emissionDate;
  ticket.firstUse = emissionDate;
  ticket.expirationDate = expirationDate;
  ticket.expirationUsageDate = expirationUsageDate;
  resumedTicket = await ticket.update();
  //Insert in radius database
  createRadiusUser(resumedTicket.login, resumedTicket.password);
  return resumedTicket;
};

const generateTicket = async (customer, device, websurfer, durationDays) => {
  const generateRandomCredentials = require("./utils/random");
  var { ticketUsername, ticketPassword } = generateRandomCredentials();
  console.log(ticketPassword,ticketUsername);
  console.log(device);
  //TODO ---> Inserire controllo se già esistenti e rigenerazione
  var emissionDate = new Date();
  var expirationDate = new Date();
  var expirationUsageDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + durationDays);
  expirationUsageDate.setDate(expirationDate.getDate() + 730); //scadenza dopo due anni circa
  var serialNumber = websurfer.id + "-" + customer.id + "-" + emissionDate.getTime();
  var generatedTicket = Ticket.create({
    ResellerId: customer.ResellerId,
    CustomerId: customer.id,
    WebsurferId: websurfer.id,
    serialNumber: serialNumber,
    pinAzienda: customer.pin,
    state: "active",
    note: "created by registration",
    login: ticketUsername,
    password: ticketPassword,
    durationDays: durationDays,
    emissionDate: emissionDate,
    firstUse: emissionDate,
    bandwidthProfile:device.bandwidthProfiles[0],
    expirationDate: expirationDate,
    expirationUsageDate: expirationUsageDate,
  });
  //Insert in radius database
  createRadiusUser(ticketUsername, ticketPassword, device.bandwidthProfiles[0].download, device.bandwidthProfiles[0].upload);
  return generatedTicket;
};

const getResellers = async () => {
  var resellers = await Reseller.findAll();
  return resellers;
};

const getCustomersByReseller = async (reseller) => {
  if (!reseller || !reseller.id) return {};

  var customers = await Customer.findAll({ where: { ResellerId: reseller.id } });
  return customers;
};

const getDevicesByReseller = async (reseller) => {
  if (!reseller || !reseller.id) return {};
  var devices = await Device.findAll({ where: { ResellerId: reseller.id } });
  return devices;
};

const getWebSurfersByCustomer = async (customer) => {
  if (!customer || !customer.id) return {};
  var websurfers = await Websurfer.findAll({ where: { CustomerId: customer.id } });
  return websurfers;
};

const getUsersByCustomer = async (customer) => {
  if (!customer || !customer.id) return {};
  var users = await User.findAll({ attributes: { exclude: ["password"] }, where: { [Op.and]: { CustomerId: customer.id, role: "CUSTOMER" } } });
  return users;
};

const getCustomerByUser = async (user) => {
  if (!user || !user.id || !user.role || user.role !== "CUSTOMER") return {};
  var customer = await Customer.findOne({ where: { id: user.CustomerId } });
  return customer;
};

const getResellerByUser = async (user) => {
  if (!user || !user.id || !user.role || user.role !== "RESELLER") return {};
  var reseller = await Reseller.findOne({ where: { id: user.ResellerId } });
  return reseller;
};

const getUsersByReseller = async (reseller) => {
  if (!reseller || !reseller.id) return {};
  var users = await User.findAll({ attributes: { exclude: ["password"] }, where: { [Op.and]: { ResellerId: reseller.id} } });
  return users;
};

const getDevicesByCustomer = async (customer) => {
  if (!customer || !customer.id) return {};
  var devices = await Device.findAll({ where: { CustomerId: customer.id } });
  return devices;
};

const getTicketsByCustomer = async (customer) => {
  if (!customer || !customer.id) return {};
  var tickets = await Ticket.findAll({ where: { CustomerId: customer.id } });
  return tickets;
};

const getTicketsByWebsurfer = async (websurfer) => {
  if (!websurfer || !websurfer.id) return {};
  var tickets = await Ticket.findAll({ where: { WebsurferId: websurfer.id } });
  return tickets;
};

const getActiveTicketsByCustomer = async (customer) => {
  if (!customer || !customer.id) return {};
  var tickets = await Ticket.findAll({ where: { CustomerId: customer.id, state: "active" } });
  return tickets;
};

const getExpiredTicketsByCustomer = async (customer) => {
  if (!customer || !customer.id) return {};
  var tickets = await Ticket.findAll({ where: { CustomerId: customer.id, state: "expired" } });
  return tickets;
};

//Restituisce tutti i dati di websurfer e ticket associati sulla base del customer  (utile interfaccia nonché per esportazione ed analisi)
const getWebSurferTicketMergedDataByCustomer = async (customer) => {
  if (!customer || !customer.id) return {};
  const sql = "SELECT * FROM websurfer, ticket WHERE ticket.WebsurferId=websurfer.id and websurfer.CustomerId=" + customer.id + ";";
  const mergedData = await sequelize.query(sql, { type: QueryTypes.SELECT });
  return mergedData;
};

//Restituisce tutti i dati di customer, websurfer ticket associati tra loro sulla base del reseller (utile per esportazione ed analisi)
const getCustomerWebSurferTicketMergedDataByReseller = async (reseller) => {
  if (!reseller || !reseller.id) return {};
  const sql =
    "SELECT * FROM customer, websurfer, ticket WHERE \
    ticket.WebsurferId = websurfer.id" +
    "and websurfer.CustomerId = " +
    customer.id +
    "and customer.resellerId=" +
    reseller.id +
    ";";
  const mergedData = await sequelize.query(sql, { type: QueryTypes.SELECT });
  return mergedData;
};

const generateTicketForNewWebsurfer = async (customer, websurfer) => {
  const webSurferFound = await Websurfer.findOne({ where: { email: websurfer.email } }); //{ or: { email: websurfer.email, phone: websurfer.phone }
  var ticketFound = await Ticket.findOne({ where: { WebsurferId: webSurferFound.id } });
  if (ticketFound) {
    //TODO set date days ecc.
    ticketFound = await resumeExpiredTicket(ticketFound, 7);
    //invio tramite sms o email
    senders.sendTicketByEmail(webSurferFound.email, ticketFound);
    senders.sendTicketBySms(webSurferFound.phone, ticketFound);
    return ticketFound;
  } else {
    //Creazione nuovo ticket
    const newTicket = generateTicket(customer, webSurferFound, 7);
    senders.sendTicketByEmail(webSurferFound.email, newTicket);
    senders.sendTicketBySms(webSurferFound.phone, newTicket);
    return newTicket;
  }
};

const getCustomersByFulltextSearch = async (searchString) => {
  if (!searchString || searchString === "") return [];
  var customer = await Customer.findAll({
    where: {
      or: {
        companyName: searchString,
        fiscalCode: searchString,
        vatCode: searchString,
        phone: searchString,
        email: searchString,
        note: searchString,
      },
    },
  });
  return customer;
};

const deleteCustomerWebSurfers = async (customer) => {
  if (!customer || !customer.id) return;
  const sql = "DELETE FROM websurfer WHERE CustomerId=" + customer.id + ";";
  const deletedData = await sequelize.query(sql, { type: QueryTypes.DELETE });
  return deletedData;
};

const deleteCustomerTickets = async (customer) => {
  if (!customer || !customer.id) return;
  const sql = "DELETE FROM ticket WHERE CustomerId=" + customer.id + ";";
  const deletedData = await sequelize.query(sql, { type: QueryTypes.DELETE });
  return deletedData;
};

const deleteWebSurferTickets = async (websurfer) => {
  if (!websurfer || !websurfer.id) return;
  const sql = "DELETE FROM ticket WHERE WebsurferId=" + websurfer.id + ";";
  const deletedData = await sequelize.query(sql, { type: QueryTypes.DELETE });
  return deletedData;
};

const deleteResellerTickets = async (reseller) => {
  if (!reseller || !reseller.id) return;
  const sql = "DELETE FROM ticket WHERE ResellerId=" + reseller.id + ";";
  const deletedData = await sequelize.query(sql, { type: QueryTypes.DELETE });
  return deletedData;
};

const deleteResellerWebSurfers = async (reseller) => {
  if (!reseller || !reseller.id) return;
  const sql = "DELETE FROM websurfer WHERE ResellerId=" + reseller.id + ";";
  const deletedData = await sequelize.query(sql, { type: QueryTypes.DELETE });
  return deletedData;
};

const deleteResellerCustomers = async (reseller) => {
  if (!reseller || !reseller.id) return;
  const sql = "DELETE FROM customer WHERE ResellerId=" + reseller.id + ";";
  const deletedData = await sequelize.query(sql, { type: QueryTypes.DELETE });
  return deletedData;
};

module.exports = {
  sequelize: sequelize,
  Reseller: Reseller,
  Customer: Customer,
  Websurfer: Websurfer,
  User: User,
  Ticket: Ticket,
  Device: Device,
  connectToDatabase: connectToDatabase,
  syncModels: syncModels,
  resumeExpiredTicket: resumeExpiredTicket,
  generateTicket: generateTicket,
  getResellers: getResellers,
  getResellerByUser: getResellerByUser,
  getUsersByReseller: getUsersByReseller,
  getDevicesByReseller: getDevicesByReseller,
  getCustomerByUser: getCustomerByUser,
  getCustomersByReseller: getCustomersByReseller,
  getDevicesByCustomer: getDevicesByCustomer,
  getWebSurfersByCustomer: getWebSurfersByCustomer,
  getActiveTicketsByCustomer: getActiveTicketsByCustomer,
  getExpiredTicketsByCustomer: getExpiredTicketsByCustomer,
  getWebSurferTicketMergedDataByCustomer: getWebSurferTicketMergedDataByCustomer,
  getCustomerWebSurferTicketMergedDataByReseller: getCustomerWebSurferTicketMergedDataByReseller,
  generateTicketForNewWebsurfer: generateTicketForNewWebsurfer,
  getCustomersByFulltextSearch: getCustomersByFulltextSearch,
  getTicketsByCustomer: getTicketsByCustomer,
  getTicketsByWebsurfer: getTicketsByWebsurfer,
  getUsersByCustomer: getUsersByCustomer,
  deleteWebSurferTickets: deleteWebSurferTickets,
  deleteCustomerWebSurfers: deleteCustomerWebSurfers,
  deleteCustomerTickets: deleteCustomerTickets,
  deleteResellerTickets: deleteResellerTickets,
  deleteResellerWebSurfers: deleteResellerWebSurfers,
  deleteResellerCustomers: deleteResellerCustomers,
};
