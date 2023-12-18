

import React, { useState } from "react";
import axios from "axios";

const UpdateForm = ({ employee, onClose }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState({
    name: employee.name,
    department: employee.department,
    position: employee.position,
    salary: employee.salary,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };


  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/employees/update/${employee._id}`,
        updatedEmployee
      );

      
      onClose();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="update-form">
      <h3>Update Employee</h3>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={updatedEmployee.name}
        onChange={handleInputChange}
      />
      <label htmlFor="department">Department</label>
      <input
        type="text"
        id="department"
        name="department"
        value={updatedEmployee.department}
        onChange={handleInputChange}
      />
      <label htmlFor="position">Position</label>
      <input
        type="text"
        id="position"
        name="position"
        value={updatedEmployee.position}
        onChange={handleInputChange}
      />
      <label htmlFor="salary">Salary</label>
      <input
        type="text"
        id="salary"
        name="salary"
        value={updatedEmployee.salary}
        onChange={handleInputChange}
      />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default UpdateForm;
