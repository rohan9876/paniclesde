// src/pages/EmployeeList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import UpdateForm from "../update/UpdateForm";
import Chart from 'chart.js/auto';

import Navbar from "../../components/navbar/Navbar";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deletedEmployee, setDeletedEmployee] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://panicle.onrender.com/employees/read");
      setEmployees(response.data);
      setLoading(false);
      renderChart(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleUpdateClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleDeleteClick = async (employeeId) => {
    try {
      await axios.delete(`https://panicle.onrender.com/employees/delete/${employeeId}`);
      const deletedEmp = employees.find((employee) => employee._id === employeeId);
      setDeletedEmployee(deletedEmp);
      fetchData();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const renderChart = (employeeData) => {
    const departmentCounts = calculateDepartmentCounts(employeeData);
  
    const ctx = document.getElementById("departmentChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(departmentCounts),
        datasets: [
          {
            label: "Number of Employees",
            data: Object.values(departmentCounts),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };
  
  const calculateDepartmentCounts = (employeeData) => {
    const departmentCounts = {};
  
    employeeData.forEach((employee) => {
      const department = employee.department;
      departmentCounts[department] = (departmentCounts[department] || 0) + 1;
    });
  
    return departmentCounts;
  };
  
  
  

  return (
    <div>
      <Navbar />
      <h3>Employee Charts and List</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <canvas id="departmentChart" width="400" height="200"></canvas>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Updation</th>
                <th>Deletion</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <button onClick={() => handleUpdateClick(employee)}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteClick(employee._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {selectedEmployee && (
        <UpdateForm
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}

      {deletedEmployee && (
        <div>
          <p>Employee deleted: {deletedEmployee.name}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
