const generateRandomCredentials = require("./random");
const Sequelize = require("sequelize");
var config = require("./config.js").load();

// CREATE A SEQUELIZE INSTANCE
const sequelizeRAD = new Sequelize(config.radius_database_configuration);

const Radcheck = sequelizeRAD.define("radcheck", {});
const RadReply = sequelizeRAD.define("radreply", {});

async function createUser(user, pass) {
  const sql = `INSERT INTO radcheck (username, attribute, op, value) VALUES ('${user}', 'Cleartext-Password', ':=', '${pass}');`;
  const sql2 = `INSERT INTO radreply (username, attribute, op, value) VALUES ('${user}', 'Mikrotik-Rate-Limit', ':=', '1024K/1024K');`;
  try {
    await sequelizeRAD.query(sql);
    await sequelizeRAD.query(sql2);
  } catch (error) {
    console.error(error);
  }
}
module.exports = createUser;
