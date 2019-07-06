const Officials = require('../models/Officials');

const MAP_POSITIONS = {
  MANAGER: 2,
  COLLABORATOR: 1,
};

class OfficialsController {
  static async index(req, res) {
    try {
      const officials = await Officials.find();
      return res.json(officials);
    } catch (err) {
      console.log({ err });
      return res.status(500).json({ message: 'An error occurred on the server.' });
    }
  }

  static async store(req, res) {
    const { permissions, email } = req.body;

    try {
      const official = await Officials.findOne({ email });

      if (official) return res.status(409).json({ message: 'Official already exists.' });

      if (permissions === MAP_POSITIONS.MANAGER) {
        const oficialManager = await Officials.findOne({ permissions: MAP_POSITIONS.MANAGER });
        if (oficialManager) return res.status(401).json({ message: 'Manager exits.' });
      }

      const newOfficial = await Officials.create(req.body);
      return res.json(newOfficial);
    } catch (err) {
      return res.status(500).json({ message: 'An error occurred on the server.' });
    }
  }
}

module.exports = OfficialsController;
