package com.management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.dao.IEmployeeDAO;
import com.management.entity.Employee;
@Service
public class EmployeeService implements IEmployeeService {
	@Autowired
	private IEmployeeDAO employeeDAO;
	@Override
	public Employee getEmployeeById(int employeeId) {
		Employee obj = employeeDAO.getEmployeeById(employeeId);
		return obj;
	}	
	@Override
	public List<Employee> getAllEmployees(){
		return employeeDAO.getAllEmployees();
	}
	@Override
	public synchronized boolean addEmployee(Employee employee){
       if (employeeDAO.employeeExists(employee.getName(), employee.getEmail())) {
    	   return false;
       } else {
    	   employeeDAO.addEmployee(employee);
    	   return true;
       }
	}
	@Override
	public void updateEmployee(Employee employee) {
		employeeDAO.updateEmployee(employee);
	}
	@Override
	public void deleteEmployee(int employeeId) {
		employeeDAO.deleteEmployee(employeeId);
	}
}
