const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

adminSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

module.exports = mongoose.model('Admin', adminSchema);
