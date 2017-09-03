package com.management.dao;
import java.util.List;

import com.management.entity.Employee;
public interface IEmployeeDAO {
    List<Employee> getAllEmployees();
    Employee getEmployeeById(int articleId);
    void addEmployee(Employee article);
    void updateEmployee(Employee article);
    void deleteEmployee(int articleId);
	boolean employeeExists(String name, String email);
}
 