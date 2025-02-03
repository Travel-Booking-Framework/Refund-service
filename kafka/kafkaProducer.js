const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "refund-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

async function sendRefundEvent(refundData) {
  await producer.connect();
  await producer.send({
    topic: "refund-events",
    messages: [{ value: JSON.stringify(refundData) }],
  });
  await producer.disconnect();
}

module.exports = sendRefundEvent;
