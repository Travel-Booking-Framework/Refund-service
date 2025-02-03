class RefundStrategy {
    processRefund(userId, amount) {
      throw new Error("processRefund() must be implemented");
    }
  }
  
  module.exports = RefundStrategy;
  