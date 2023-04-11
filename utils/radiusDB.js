const generateRandomCredentials = require('./random');
const Sequelize = require('sequelize');

// CREATE A SEQUELIZE INSTANCE
const sequelizeRAD = new Sequelize({
    dialect: 'mysql',
    host: '5.83.124.9',
    port: 3306,
    username: 'hotspotsystem',
    password: 'hotspotsystem2023!',
    database: 'radius'
})

const Radcheck = sequelizeRAD.define('radcheck', {});
const RadReply = sequelizeRAD.define('radreply', {})

async function createUser(user,pass){
    const sql = `INSERT INTO radcheck (username, attribute, op, value) VALUES ('${user}', 'Cleartext-Password', ':=', '${pass}');`;
    const sql2 = `INSERT INTO radreply (username, attribute, op, value) VALUES ('${user}', 'Mikrotik-Rate-Limit', ':=', '1024K/1024K');`;
    try{
        await sequelizeRAD.query(sql);
        await sequelizeRAD.query(sql2);
    }catch(error){
        console.error(error);
    }
}
module.exports = createUser
