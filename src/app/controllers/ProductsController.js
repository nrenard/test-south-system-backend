const Products = require('../models/Products');

class ProductsController {
  static async index(req, res) {
    try {
      const {
        price_min: priceMin,
        price_max: priceMax,
        page = 1,
        title,
      } = req.query;

      const filters = {};

      const options = {
        sort: '-createdAt',
        limit: 5,
        populate: ['author'],
        page: page < 1 ? 1 : page,
      };

      if (title) {
        filters.title = new RegExp(title, 'i');
      }

      if (priceMin || priceMax) {
        filters.price = {};

        if (priceMin) {
          filters.price.$gte = priceMin;
        }

        if (priceMax) {
          filters.price.$lte = priceMax;
        }
      }

      const products = await Products.paginate(filters, options);
      return res.json(products);
    } catch (err) {
      return res.status(500).json({ message: 'An error occurred on the server.' });
    }
  }

  static async show(req, res) {
    try {
      const filter = { _id: req.params.id };

      if (!req.officialId) filter.status = true;

      const product = await Products.findOne(filter).populate('author');

      if (!product) return res.status(404).json({ message: 'Product does not active.' });

      return res.json(product);
    } catch (err) {
      return res.status(500).json({ message: 'An error occurred on the server.' });
    }
  }

  static async store(req, res) {
    try {
      const product = await Products.create({ ...req.body, author: req.officialId });
      return res.json(product);
    } catch (err) {
      return res.status(500).json({ message: 'An error occurred on the server.' });
    }
  }

  static async update(req, res) {
    try {
      const product = await Products.findOne({ _id: req.params.id });

      if (!product) return res.status(404).json({ message: 'Product does not exist.' });

      await Products.findOneAndUpdate({ _id: req.params.id }, req.body);

      return res.json({ sucess: true });
    } catch (err) {
      return res.status(500).json({ message: 'An error occurred on the server.' });
    }
  }

  static async destroy(req, res) {
    try {
      const product = await Products.findOne({ _id: req.params.id });

      if (!product) return res.status(404).json({ message: 'Product does not exist.' });

      await Products.deleteOne({ _id: req.params.id });
      return res.json({ sucess: true });
    } catch (err) {
      return res.status(500).json({ message: 'An error occurred on the server.' });
    }
  }
}

module.exports = ProductsController;
