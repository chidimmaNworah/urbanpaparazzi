// import mongoose from "mongoose";

// const connection = {
//   isConnected: false,
// };

// async function connectDb() {
//   if (connection.isConnected) {
//     console.log("Already connected to the database.");
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     connection.isConnected = true;
//     console.log("New connection to the database.");
//   } catch (error) {
//     console.error("Error connecting to the database:", error.message);
//     throw error; // Rethrow the error to handle it in the calling code
//   }
// }

// async function disconnectDb() {
//   if (connection.isConnected) {
//     if (process.env.NODE_ENV === "production") {
//       try {
//         await mongoose.disconnect();
//         connection.isConnected = false;
//         console.log("Disconnected from the database.");
//       } catch (error) {
//         console.error("Error disconnecting from the database:", error.message);
//         throw error; // Rethrow the error to handle it in the calling code
//       }
//     } else {
//       console.log("Not disconnecting from the database in development.");
//     }
//   }
// }

// const db = { connectDb, disconnectDb };
// export default db;

import mongoose, { mongo } from "mongoose";
const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Use previous connection to the database.");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("New connection to the database.");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_END === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not diconnecting from the database.");
    }
  }
}
const db = { connectDb, disconnectDb };
export default db;
