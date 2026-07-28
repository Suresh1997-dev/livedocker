const express = require("express");
const router = express.Router();
const pool = require('../db');


router.post("/adding_data", async (req, res) => {

  try {
    const {name,email} = req.body;

    // ✅ insert new
    const [insertResult] = await pool.query(
      "INSERT INTO users (name,email) VALUES (?, ?)",
      [name,email]
    );

    return res
      .status(200)
      .json({ message: "Successfully Added", insertId: insertResult.insertId });
  } catch (err) {
    console.log("Database Error:", err);
    return res.status(500).json({ message: "Database Error", error: err });
  }
});

router.get("/hello", (req, res) => {
  res.send("Hello from the backend!");
});
router.get("/getcrud", async (req, res) => {
  try {
    // const organisation_id = req.params.organisationid;

    const [result] = await pool.query(
      `SELECT id,name,email,created_at FROM users`
    );
  // console.log(result,"ssss")
    return res.status(200).json(result);
  } catch (err) {
    console.log("Database Error:", err);
    return res.status(500).json({ message: "Database Error" });
  }
});



router.put("/updatecruddata/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {name,email} = req.body;

    const [result] = await pool.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name,email,id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Master not found" });
    }
console.log(result,"update")
    return res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    console.error("Database Error:", err);
    return res.status(500).json({ message: "Database Error" });
  }
});





router.delete("/deleteDutylabel/:id", async (req, res) => {
  try {
    const { id} = req.params;

    const [result] = await pool.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Master not found" });
    }

    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    console.error("Database Error:", err);
    return res.status(500).json({ message: "Database Error" });
  }
});








module.exports = router;