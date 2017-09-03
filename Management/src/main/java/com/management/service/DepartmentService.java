package com.management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.dao.IDepartmentDAO;
import com.management.entity.Department;
@Service
public class DepartmentService implements IDepartmentService {
	@Autowired
	private IDepartmentDAO departmentDAO;
	@Override
	public Department getDepartmentById(int departmentId) {
		Department obj = departmentDAO.getDepartmentById(departmentId);
		return obj;
	}	
	@Override
	public List<Department> getAllDepartments(){
		return departmentDAO.getAllDepartments();
	}
	@Override
	public synchronized boolean addDepartment(Department department){
       if (departmentDAO.departmentExists(department.getName())) {
    	   return false;
       } else {
    	   departmentDAO.addDepartment(department);
    	   return true;
       }
	}
	@Override
	public void updateDepartment(Department department) {
		departmentDAO.updateDepartment(department);
	}
	@Override
	public void deleteDepartment(int departmentId) {
		departmentDAO.deleteDepartment(departmentId);
	}
}
