const jwt = require('jsonwebtoken');
const { UnauthorizedErr } = require('../errors');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedErr('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch {
    next(new UnauthorizedErr('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};

module.exports = auth;
