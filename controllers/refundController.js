const RefundFactory = require("../strategies/RefundFactory");
const RefundService = require("../services/RefundService");

async function refundHandler(req, res) {
  const { userId, amount, type } = req.body;

  try {
    const strategy = RefundFactory.getRefundStrategy(type);
    const refundService = new RefundService(strategy);

    const response = await refundService.processRefund(userId, amount);
    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = { refundHandler };
