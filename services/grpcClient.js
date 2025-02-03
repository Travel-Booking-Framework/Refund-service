const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
require("dotenv").config();

const PROTO_PATH = __dirname + "/../proto/wallet.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const walletProto = grpc.loadPackageDefinition(packageDefinition).wallet;

const client = new walletProto.WalletService(
  process.env.WALLET_SERVICE_URL,
  grpc.credentials.createInsecure()
);

module.exports = client;
