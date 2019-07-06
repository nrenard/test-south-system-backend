const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ProductsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Officials',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ProductsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Products', ProductsSchema);
