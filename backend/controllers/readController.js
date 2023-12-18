const express = require("express");
const Employee = require("../employee");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { department, position, minSalary, maxSalary } = req.query;
    const query = {};
    if (department) query.department = department;
    if (position) query.position = position;
    if (minSalary !== undefined && maxSalary !== undefined) {
      query.salary = {
        $gte: parseFloat(minSalary),
        $lte: parseFloat(maxSalary),
      };
    }

    const employees = await Employee.find(query);
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;