import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: '',
        NIC: '',
        empId: '',
        Division: '',
        email: '',
        Designation: '',
        mobile: '',
        permanantAddress: '',
        temporaryAddress: '',
        dob: '',
        doj: '',
        salary: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        axios.get(`http://localhost:8000/user/employee/id/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => {
            setEmployee(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }, [id]);
      

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        try {
          await axios.put(`http://localhost:8000/user/employee/${id}`, employee, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire({
            title: 'Employee has been updated!',
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
          navigate("/home")

        } catch (error) {
          console.error('Error updating employee:', error);
          Swal.fire(
            'Error!',
            'There was an error updating the user.',
            'error'
          );        
        }
      };
      

  return (
    <div className="container mt-4">
      <h2>Edit Employee Details</h2><hr/>
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
        <button type="submit" className="btn btn-success mt-3">Edit Employee</button>
      </form>
    </div>
  )
}

export default EditEmployee