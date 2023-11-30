const mongoose = require("mongoose");

const dbConnect = () => {
  const connectionParams = { useNewUrlParse: true };
  mongoose.connect(process.env.DB, connectionParams);

  mongoose.connection.on("connected", () => {
    console.log("Connect to the DataBase sucessfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error while connecting to database:" + err);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection disconnected.");
  });
};

module.exports = dbConnect;
