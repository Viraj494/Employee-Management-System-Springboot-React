import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function Home() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetchEmployees();
  }, []);
  const fetchEmployees = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        setError('No authentication token found. Please log in.');
        setLoading(false);
        return;
    }

    axios.get('http://localhost:8000/user/allEmployees', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        setEmployees(response.data);
        setLoading(false);
    })
    .catch(error => {
        setError('There was an error fetching the employees!');
        setLoading(false);
    });
};



const deleteEmployee = (id) => {
  const token = localStorage.getItem('token');

  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this employee!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://localhost:8000/user/employee/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setEmployees(employees.filter(employee => employee.id !== id));
        Swal.fire({
          title: 'Employee has been deleted!',
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
      })
      .catch(error => {
        Swal.fire(
          'Error!',
          'There was an error deleting the employee!',
          'error'
        );
      });
    }
  });
};

  

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/editEmployee/${id}`);
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(employee => {
    return (
      employee.eid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.division.toLowerCase().includes(searchTerm.toLowerCase())

    );
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
    
  if (error) return <div>{error}</div>;

  return (
    <div className='container-fluid p-2'>

      <button onClick={() => navigate('/addEmployee')} className='btn btn-secondary btn-sm'>+ Add New Employee</button>
      <div className="input-group mt-2 mb-2" style={{width:'320px'}}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search by Employee ID, Name or Division"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className='table table-hover mt-2'>
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>NIC</th>
            <th>Division</th>
            <th>Designation</th>
            <th style={{width:'10px'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.eid}</td>
              <td>{employee.name}</td>
              <td>{employee.nic}</td>
              <td>{employee.division}</td>
              <td>{employee.designation}</td>
              <td style={{ display: 'flex' }}>
                <button
                  className='btn btn-warning mr-2 rounded-0'
                  onClick={() => handleEdit(employee.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className='btn btn-warning mr-2 rounded-0'
                  onClick={() => deleteEmployee(employee.id)}
                >
                  <MdDelete />
                </button>
                <button
                  className='btn btn-warning rounded-0'
                  onClick={() => handleView(employee)}
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && (
        <div className={`modal fade ${showModal ? 'show d-block' : 'd-none'}`} tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Employee Details</h5>
              </div>
              <div className="modal-body">
                <p><strong>Employee ID:</strong> {selectedEmployee.eid}</p>
                <p><strong>Name:</strong> {selectedEmployee.name}</p>
                <p><strong>NIC:</strong> {selectedEmployee.nic}</p>
                <p><strong>Email:</strong> {selectedEmployee.email}</p>
                <p><strong>Mobile:</strong> {selectedEmployee.mobile}</p>
                <p><strong>Division:</strong> {selectedEmployee.division}</p>
                <p><strong>Designation:</strong> {selectedEmployee.designation}</p>
                <p><strong>Permanent Address:</strong> {selectedEmployee.addr1}</p>
                <p><strong>Temporary Address:</strong> {selectedEmployee.addr2}</p>
                <p><strong>Date of Birth:</strong> {new Date(selectedEmployee.dob).toLocaleDateString()}</p>
                <p><strong>Date of Joining:</strong> {new Date(selectedEmployee.doj).toLocaleDateString()}</p>
                <p><strong>Salary:</strong> {selectedEmployee.salary}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
