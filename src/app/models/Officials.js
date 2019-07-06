const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const officialsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  permissions: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

officialsSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

officialsSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  },
  toJSON() {
    const oficial = this.toObject();
    delete oficial.password;
    return oficial;
  },
};

officialsSchema.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, process.env.APP_SECRET, {
      expiresIn: 86400,
    });
  },
};

module.exports = mongoose.model('Officials', officialsSchema);
