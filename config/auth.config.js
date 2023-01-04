const config = {
  jwtSecret: process.env.JWT_SECRET_KEY,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  jwtExpiration: `${process.env.JWT_EXPIRATION_MINUTES}m`,
  refreshTokenExpiration: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_DAY}d`,
};

module.exports = config;