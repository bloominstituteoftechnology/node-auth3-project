module.exports = {
  jwtSecret:
    process.env.JWT_SECRET ||
    'under any circumstance, do not share this information with anyone.'
};
