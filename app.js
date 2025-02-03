const sequelize = require("./config/database");
const RefundLog = require("./models/RefundLog");

async function startServer() {
  try {
    await sequelize.sync(); // Sync database tables
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Refund service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

startServer();
