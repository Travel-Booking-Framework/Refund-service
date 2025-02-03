const sendRefundEvent = require("../kafka/kafkaProducer");
const RefundLog = require("../models/RefundLog");

class RefundService {
  constructor(strategy) {
    this.strategy = strategy;
  }

  async processRefund(userId, amount) {
    try {
      const response = await this.strategy.processRefund(userId, amount);

      // Save refund log in the database
      await RefundLog.create({
        userId,
        amount,
        status: response.success ? "success" : "failed",
      });

      // Publish refund event to Kafka if successful
      if (response.success) {
        await sendRefundEvent({ userId, amount, status: "success", timestamp: new Date() });
      }

      return response;
    } catch (error) {
      console.error("Refund processing error:", error);

      // Save failure log in database
      await RefundLog.create({
        userId,
        amount,
        status: "failed",
      });

      throw error;
    }
  }
}

module.exports = RefundService;
