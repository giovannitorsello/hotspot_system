let randomPin = '';
const maxLength = 5;
const chars = '0123456789';

    for (let i = 0; i < maxLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomPin += chars[randomIndex];
    }
  module.exports = randomPin