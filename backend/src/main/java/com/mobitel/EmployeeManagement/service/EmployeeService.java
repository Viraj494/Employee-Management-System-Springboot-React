package com.mobitel.EmployeeManagement.service;

import com.mobitel.EmployeeManagement.entity.Employee;
import com.mobitel.EmployeeManagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Create a new employee
    public Employee postEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    // Get all employees
    public List<Employee> getAllEmployee(){
        return employeeRepository.findAll();
    }

    // Get an employee by ID
    public Employee getEmployeeById(Long id){
        return employeeRepository.findById(id).orElse(null);
    }

    // Get an employee by Employee ID
    public Employee getEmployeeByEId(String eid){
        return employeeRepository.findByEid(eid).orElse(null);
    }


    // Delete an employee by ID
    public void deleteEmployee(Long id){
        employeeRepository.deleteById(id);
    }

    // Update an existing employee
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if (optionalEmployee.isPresent()) {
            Employee existingEmployee = optionalEmployee.get();

            // Update all fields
            existingEmployee.setEid(employeeDetails.getEid());
            existingEmployee.setName(employeeDetails.getName());
            existingEmployee.setNic(employeeDetails.getNic());
            existingEmployee.setEmail(employeeDetails.getEmail());
            existingEmployee.setMobile(employeeDetails.getMobile());
            existingEmployee.setDivision(employeeDetails.getDivision());
            existingEmployee.setDesignation(employeeDetails.getDesignation());
            existingEmployee.setAddr1(employeeDetails.getAddr1());
            existingEmployee.setAddr2(employeeDetails.getAddr2());
            existingEmployee.setDob(employeeDetails.getDob());
            existingEmployee.setDoj(employeeDetails.getDoj());
            existingEmployee.setSalary(employeeDetails.getSalary());

            return employeeRepository.save(existingEmployee);
        } else {
            throw new RuntimeException("Employee not found with id " + id);
        }
    }

}
