const Officials = require('../models/Officials');

const basePermissions = async (req, res, next, permission) => {
  try {
    const official = req.official || await Officials.findOne({ _id: req.officialId });

    if (!official) return res.status(401).json({ message: 'Official does not exists.' });

    if (official.permissions < permission) return res.status(401).json({ message: 'Acess restrict.' });

    req.official = official;

    return next();
  } catch (err) {
    return res.status(500).json({ message: 'An error occurred on the server.' });
  }
};

module.exports = {
  highPermission: async (req, res, next) => basePermissions(req, res, next, 2),
  lowPermission: async (req, res, next) => basePermissions(req, res, next, 1),
};
