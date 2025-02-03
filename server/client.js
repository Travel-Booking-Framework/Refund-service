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

// Create gRPC Client
const client = new refundProto.RefundService("localhost:50051", grpc.credentials.createInsecure());

// Send a refund request
const request = {
  transaction_id: "123456",
  amount: 50.0,
  reason: "Product returned",
};

client.ProcessRefund(request, (error, response) => {
  if (error) {
    console.error("Error processing refund:", error);
  } else {
    console.log("Refund Response:", response);
  }
});
