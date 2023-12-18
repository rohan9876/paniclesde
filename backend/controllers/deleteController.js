const express = require("express");
const Employee = require("../employee");
const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;

    const existingEmployee = await Employee.findById(employeeId);
    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    await Employee.deleteOne({ _id: existingEmployee._id });

    res.json({ message: "Employee deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;