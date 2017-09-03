package com.management.service;

import java.util.List;

import com.management.entity.Employee;

public interface IEmployeeService {
     List<Employee> getAllEmployees();
     Employee getEmployeeById(int articleId);
     boolean addEmployee(Employee article);
     void updateEmployee(Employee article);
     void deleteEmployee(int articleId);
}
