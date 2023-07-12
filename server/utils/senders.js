var config = require("../config.js").load();
const spawn = require("child_process").spawn;
const nodemailer = require("nodemailer");

const sendTicketByEmail = (email, ticket, urlToLogin) => {
  if (!email) return;
  if (!ticket) return;
  if (!ticket.id) return;

  var ticketMessage = "Le tue credenziali wifi sono: \n Username: " + ticket.login + "\n Password: " + ticket.password + "\n";
  ticketMessage += "Disabilita i dati SIM, attiva il WIFI e vai a questo indirizzo:" + urlToLogin;
  if (config.mailserver) {
    let transporter = nodemailer.createTransport(config.mailserver);
    var mailOptions = {
      from: config.mailserver.auth.user,
      to: email,
      subject: "New Wifi Ticket",
      text: ticketMessage,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        console.log(urlToLogin);
      }
    });
  }
};

const sendTicketBySms = (phone, ticket) => {
  if (!phone) return;
  if (!ticket.id) return;

  var ticketMessage = "Le tue credenziali wifi sono: \n login: " + ticket.login + "\n password: " + ticket.password + "\n";
  var prc = spawn("/usr/local/bin/sendSms.sh", [phone, ticketMessage]);
  prc.stdout.setEncoding("utf8");
  prc.stdout.on("data", function (data) {
    console.log("Sms sent", data);
  });
  prc.on("close", function (code) {
    console.log("Finish sms procedure.");
  });
};

module.exports = {
  sendTicketByEmail: sendTicketByEmail,
  sendTicketBySms: sendTicketBySms,
};
