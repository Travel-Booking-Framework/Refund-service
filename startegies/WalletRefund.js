const RefundStrategy = require("./RefundStrategy");
const walletClient = require("../services/grpcClient");

class WalletRefund extends RefundStrategy {
  async processRefund(userId, amount) {
    return new Promise((resolve, reject) => {
      walletClient.ProcessRefund({ user_id: userId, amount }, (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  }
}

module.exports = WalletRefund;
