package com.mobitel.EmployeeManagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Employee ID is mandatory")
    private String eid;

    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "NIC is mandatory")
    private String nic;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is mandatory")
    private String email;

    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "Mobile number is invalid")
    @NotBlank(message = "Mobile number is mandatory")
    private String mobile;

    @NotBlank(message = "Division is mandatory")
    private String division;

    @NotBlank(message = "Designation is mandatory")
    private String designation;

    @NotBlank(message = "Address Line 1 is mandatory")
    private String addr1;

    private String addr2; // Address Line 2 can be optional

    @Past(message = "Date of birth must be in the past")
    private LocalDate dob;

    @PastOrPresent(message = "Date of joining must be in the past or present")
    private LocalDate doj;

    @DecimalMin(value = "0.0", inclusive = false, message = "Salary must be greater than 0")
    private double salary;
}
