const express = require("express");
const Employee = require("../employee");
const router = express.Router();

router.put("/:id", async (req, res) => {
  try {
    const { name, department, position, salary } = req.body;
    if (
      (name && typeof name !== "string") ||
      (department && typeof department !== "string") ||
      (position && typeof position !== "string") ||
      (salary && (typeof salary !== "number" || isNaN(salary) || salary <= 0))
    ) {
      return res.status(400).json({
        error: "Invalid input. Please provide valid data types for each field.",
      });
    }

    const employeeId = req.params.id;

    const existingEmployee = await Employee.findById(employeeId);
    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    if (name) existingEmployee.name = name;
    if (department) existingEmployee.department = department;
    if (position) existingEmployee.position = position;
    if (salary) existingEmployee.salary = salary;

    await existingEmployee.save();

    res.json({ message: "Employee updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;