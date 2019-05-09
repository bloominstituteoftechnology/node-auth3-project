module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'add this variable to your .env file',

  mantra: 'for many to many, third table',
  otherMantra: 'one to many > Foreign Key',
  yetAnotherMantra: 'where does the FK go... the many side',
};
