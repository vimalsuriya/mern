const express = require('express');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/process', auth, async (req, res) => {
  try {
    const { mobile, operator, plan, paymentMethod } = req.body;
    
    const transactionId = 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9);
    
    const transaction = new Transaction({
      userId: req.userId,
      mobile,
      operator,
      plan,
      amount: plan.price,
      paymentMethod,
      transactionId
    });

    await transaction.save();
    
    res.json({
      success: true,
      transactionId,
      message: 'Recharge successful'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;