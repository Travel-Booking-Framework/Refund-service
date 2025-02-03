const RefundStrategy = require("./RefundStrategy");

class BankRefund extends RefundStrategy {
  async processRefund(userId, amount) {
    console.log(`Refunding $${amount} to bank account of user ${userId}`);
    return { success: true, message: "Refund processed via bank" };
  }
}

module.exports = BankRefund;
