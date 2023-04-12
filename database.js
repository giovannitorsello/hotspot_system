const Sequelize = require("sequelize");
var config = require("./config.js").load();
const generateRandomCredentials = require("./utils/random");
const createRadiusUser = require("./utils/radiusDB");

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
    defaultBandwidth: {
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

const generateTicket = (customer, websurfer, durationDays) => {
  var { ticketUsername, ticketPassword } = generateRandomCredentials();
  //Inserire controllo se già esistenti e rigenerazione
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
    state: "valid",
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

module.exports = {
  sequelize: sequelize,
  Websurfer: Websurfer,
  Customer: Customer,
  User: User,
  Ticket: Ticket,
  Reseller: Reseller,
  connectToDatabase: connectToDatabase,
  syncModels: syncModels,
  generateTicket: generateTicket,
};
