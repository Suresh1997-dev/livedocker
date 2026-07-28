const mysql = require("mysql2/promise");
require('dotenv').config()

// Create pool (recommended)
const pool = mysql.createPool({
 host: process.env.DB_HOST,
  user: process.env.DB_User,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
   charset: "utf8mb4" 
});
// WITHOUT ENV FILE
// const pool = mysql.createPool({
//  host: "db",
//   user: "root",
//   password: "root123",
//   database: "TEST_DB",
//   port: 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//    charset: "utf8mb4" 
// });


// Test the connection once at startup
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL connected successfully!",process.env.DB_HOST);
    connection.release(); // release back to pool
  } catch (err) {
    //  const connection = await pool.getConnection();
    // connection.release();
    console.error("❌ MySQL connection failed:", err.message);
  }
})();

module.exports = pool;
