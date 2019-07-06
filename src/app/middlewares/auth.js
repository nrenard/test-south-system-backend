const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token malformated' });
  }

  try {
    const { id } = await jwt.verify(token, process.env.APP_SECRET);

    req.officialId = id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token not authorizated' });
  }
};
