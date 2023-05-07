const moment = require('moment');

// Metodo per formattare la data attuale come DD-MM-YYYY
function formatCurrentDate() {
  return moment().format('YYYY-MM-DD');
}

// Metodo per calcolare i giorni rimanenti tra due date
function calculateRemainingDays(date) {
  const today = moment();
  const expiryDate = moment(date, 'YYYY-MM-DD');
  return expiryDate.diff(today, 'days');
}

// Metodo per aggiungere 7 giorni a una data
function addDays(date) {
  const formattedDate = moment(date, 'YYYY-MM-DD');
  formattedDate.add(7, 'days');
  return formattedDate.format('YYYY-MM-DD');
}

  
  module.exports = {
    formatCurrentDate,
    calculateRemainingDays,
    addDays
  };
  