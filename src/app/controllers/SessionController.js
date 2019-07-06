const Officials = require('../models/Officials');

class SessionController {
  static async store(req, res) {
    try {
      const { email, password } = req.body;
      const official = await Officials.findOne({ email });

      if (!official) return res.status(401).json({ message: 'Official does not exists.' });

      if (!(await official.compareHash(password))) return res.status(401).json({ message: 'Password incorrect.' });

      return res.json({ token: await Officials.generateToken(official) });
    } catch (err) {
      return res.status(500).json({ message: 'An error occurred on the server.' });
    }
  }
}

module.exports = SessionController;
