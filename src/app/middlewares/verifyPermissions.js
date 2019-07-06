const Officials = require('../models/Officials');

module.exports = {
  highPermission: async (req, res, next) => {
    try {
      const official = await Officials.findOne({ _id: req.officialId });
      if (official.permissions < 2) return res.status(401).json({ message: 'Acess restrict.' });

      req.official = official;

      return next();
    } catch (err) {
      return res.status(500).json({ message: 'An error occurred on the server.' });
    }
  },
  lowPermission: async (req, res, next) => {
    try {
      const official = await Officials.findOne({ _id: req.officialId });

      if (official.permissions < 1) return res.status(401).json({ message: 'Acess restrict.' });

      req.official = official;

      return next();
    } catch (err) {
      return res.status(500).json({ message: 'An error occurred on the server.' });
    }
  },
};
