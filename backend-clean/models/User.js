const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  walletBalance: { type: Number, default: 2500 },
  rewardPoints: { type: Number, default: 1250 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);