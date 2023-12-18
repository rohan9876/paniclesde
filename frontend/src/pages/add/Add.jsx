// src/pages/Add.js

import Navbar from "../../components/navbar/Navbar";
import React, { useState } from "react";
import axios from "axios";
import "./add.css";

export default function Add() {
    const [formData, setFormData] = useState({
        name: "",
        department: "",
        position: "",
        salary: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          
            if (!formData.name || !formData.department || !formData.position || !formData.salary) {
                console.error("Please fill in all required fields");
                return;
            }
    
            const response = await axios.post("http://localhost:8080/employees/create/", formData);
            console.log("Success:", response.data);
            alert("Employee added sucessfully");
            setFormData({
                name: "",
                department: "",
                position: "",
                salary: "",
            });
        } catch (error) {
            console.error("Error:", error);
            // handle and display error messages to the user
        }
    };

    return (
        <div className="div1">
            <Navbar />
            <h3>Add Employee</h3>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Employee Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name.."
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="department">Department</label>
                <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                >
                    <option value="select">select</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Business Development">Business Development</option>
                </select>

                <label htmlFor="position">Position</label>
                <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                >
                    <option value="select">select</option>
                    <option value="intern">Intern</option>
                    <option value="level 1">Level 1</option>
                    <option value="level 2">Level 2</option>
                    <option value="level 3">Level 3</option>
                    <option value="manager">Manager</option>
                </select>

                <label htmlFor="salary">Salary</label>
                <input
                    type="text"
                    id="salary"
                    name="salary"
                    placeholder="Salary.."
                    value={formData.salary}
                    onChange={handleChange}
                />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
