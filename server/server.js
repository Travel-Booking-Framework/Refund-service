require("dotenv").config();
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load Protobuf
const PROTO_PATH = "./refund.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const refundProto = grpc.loadPackageDefinition(packageDefinition).refund;

// Refund Logic (Replaces Express Handler)
const refundHandler = (call, callback) => {
  const { transaction_id, amount, reason } = call.request;

  if (!transaction_id || amount <= 0) {
    return callback(null, { success: false, message: "Invalid refund request" });
  }

  console.log(`Processing refund for Transaction: ${transaction_id}, Amount: ${amount}`);

  // Mock success response
  callback(null, { success: true, message: `Refund of $${amount} processed successfully.` });
};

// Start gRPC Server
const server = new grpc.Server();
server.addService(refundProto.RefundService.service, { ProcessRefund: refundHandler });

const PORT = process.env.GRPC_PORT || 50051;
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`gRPC Refund Service running on port ${PORT}`);
  server.start();
});
