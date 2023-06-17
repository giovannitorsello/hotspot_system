export function generateRandomPassword(length) {
    return Math.random().toString(36).slice(-length);
  }