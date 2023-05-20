function generateRandomCredentials(len = 5) {
  let ticketUsername = "";
  let ticketPassword = "";
  const maxLength = len;
  const chars = "0123456789";

  for (let i = 0; i < maxLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    ticketUsername += chars[randomIndex];
  }

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    ticketPassword += chars[randomIndex];
  }

  return [ticketUsername, ticketPassword];
}

module.exports = generateRandomCredentials;
