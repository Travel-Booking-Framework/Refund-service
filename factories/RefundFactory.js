const WalletRefund = require("./WalletRefund");
const BankRefund = require("./BankRefund");

class RefundFactory {
  static getRefundStrategy(type) {
    if (type === "wallet") return new WalletRefund();
    if (type === "bank") return new BankRefund();
    throw new Error("Invalid refund type");
  }
}

module.exports = RefundFactory;
