import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

function AddEmployee() {
  const [employee, setEmployee] = useState({
    eid: '',
    name: '',
    nic: '',
    email: '',
    mobile: '',
    division: '',
    designation: '',
    addr1: '',
    addr2: '',
    dob: '',
    doj: '',
    salary: ''
  });

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the employee ID already exists
    axios.get(`http://localhost:8000/user/employee/${employee.eid}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.data.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Employee ID already exists!',
            text: 'Please choose a different one.'
          });
        } else {
          // If the ID doesn't exist, proceed with adding the employee
          axios.post('http://localhost:8000/user/employee', employee, {
            headers: { Authorization: `Bearer ${token}` }
          })
            .then(response => {
              Swal.fire({
                title: 'The employee added succesfully!',
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
              });
              // Clear the form
              setEmployee({
                eid: '',
                name: '',
                nic: '',
                email: '',
                mobile: '',
                division: '',
                designation: '',
                addr1: '',
                addr2: '',
                dob: '',
                doj: '',
                salary: ''
              });
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an error adding the employee.'
              });
            });
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'The employee ID is already Exist!'
        });
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add New Employee</h2><hr/>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-2">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={employee.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label>NIC</label>
              <input
                type="text"
                className="form-control"
                name="nic"
                value={employee.nic}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={employee.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label>Mobile</label>
              <input
                type="text"
                className="form-control"
                name="mobile"
                value={employee.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dob"
                value={employee.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label>Permanent Address</label>
              <input
                type="text"
                className="form-control"
                name="addr1"
                value={employee.addr1}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-2">
              <label>Temporary Address</label>
              <input
                type="text"
                className="form-control"
                name="addr2"
                value={employee.addr2}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-2">
              <label>Employee ID</label>
              <input
                type="text"
                className="form-control"
                name="eid"
                value={employee.eid}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label>Division</label>
              <input
                type="text"
                className="form-control"
                name="division"
                value={employee.division}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label>Designation</label>
              <input
                type="text"
                className="form-control"
                name="designation"
                value={employee.designation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label>Date of Joining</label>
              <input
                type="date"
                className="form-control"
                name="doj"
                value={employee.doj}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label>Salary</label>
              <input
                type="number"
                className="form-control"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-success mt-3">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
