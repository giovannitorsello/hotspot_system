const Sequelize = require("sequelize");
var config = require("./config.js").load();
const generateRandomCredentials = require("./utils/random");
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
    pin: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    defaultBandwidth: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    bandwidthProfiles: {
      type: Sequelize.TEXT,
      /*get: function () {
        if (this.getDataValue("value")) return JSON.parse(this.getDataValue("value"));
        else return {};
      },
      set: function (value) {
        this.setDataValue("value", JSON.stringify(value));
      },*/
      allowNull: true,
    },
    websurferCustomFields: {
      type: Sequelize.TEXT,
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
    addessCompany: {
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
    pin: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    profile: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    defaultBandwidth: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { tableName: "reseller" }
);

const User = sequelize.define(
  "User",
  {
    role: {
      type: Sequelize.ENUM("SUPERADMIN", "RESELLER", "HOTEL", "USER"),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    utente: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { tableName: "user" }
);

const Ticket = sequelize.define(
  "Ticket",
  {
    emissionDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    firstUse: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    expirationDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    expirationUsageDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    durationDays: {
      type: Sequelize.INTEGER,
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
    pinAzienda: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "ticket" }
);

Reseller.hasMany(Customer);
Reseller.hasMany(Ticket);
Reseller.hasMany(User);
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
    await sequelize.sync({ force: false });
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

const generateTicket = (customer, websurfer, durationDays) => {
  var { ticketUsername, ticketPassword } = generateRandomCredentials();
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
    expirationDate: expirationDate,
    expirationUsageDate: expirationUsageDate,
  });
  //Insert in radius database
  createRadiusUser(ticketUsername, ticketPassword);
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

const getWebSurfersByCustomer = async (customer) => {
  if (!customer || !customer.id) return {};
  var websurfers = await Websurfer.findAll({ where: { CustomerId: customer.id } });
  return websurfers;
};

const getCustomerByUser = async (user) => {
  if (!user || !user.id) return {};
  var customer = await Customer.findOne({ where: { id: user.CustomerId } });
  return customer;
};

const getResellerByUser = async (user) => {
  if (!user || !user.id) return {};
  var reseller = await Reseller.findOne({ where: { id: user.CustomerId } });
  return reseller;
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

module.exports = {
  sequelize: sequelize,
  Websurfer: Websurfer,
  Customer: Customer,
  User: User,
  Ticket: Ticket,
  Reseller: Reseller,
  connectToDatabase: connectToDatabase,
  syncModels: syncModels,
  resumeExpiredTicket: resumeExpiredTicket,
  generateTicket: generateTicket,
  getResellers: getResellers,
  getResellerByUser: getResellerByUser,
  getCustomerByUser: getCustomerByUser,
  getCustomersByReseller: getCustomersByReseller,
  getWebSurfersByCustomer: getWebSurfersByCustomer,
  getActiveTicketsByCustomer: getActiveTicketsByCustomer,
  getExpiredTicketsByCustomer: getExpiredTicketsByCustomer,
  getWebSurferTicketMergedDataByCustomer: getWebSurferTicketMergedDataByCustomer,
  getCustomerWebSurferTicketMergedDataByReseller: getCustomerWebSurferTicketMergedDataByReseller,
  generateTicketForNewWebsurfer: generateTicketForNewWebsurfer,
  getCustomersByFulltextSearch: getCustomersByFulltextSearch,
};
