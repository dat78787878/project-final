const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:Ao0zkKmeMJpb8ojC@cluster0.wlohl.mongodb.net/project_db?retryWrites=true&w=majority"
    );

    console.log("Connect successfully!!");
  } catch (error) {
    console.log("Connect failed!!");
  }
}

module.exports = { connect };
