const express = require("express");
const Employee = require("../employee");
const router = express.Router();

router.post("/", async (req, res) => {
    console.log(req.body);
  try {
    const { name, department, position, salary } = req.body;
   

    const newEmployee = new Employee({
      name,
      department,
      position,
      salary,
    });

    await newEmployee.save();
    console.log(newEmployee);

    res.status(201).json({ message: "Employee created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;