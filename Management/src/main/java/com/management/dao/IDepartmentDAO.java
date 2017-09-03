package com.management.dao;
import java.util.List;

import com.management.entity.Department;
public interface IDepartmentDAO {
    List<Department> getAllDepartments();
    Department getDepartmentById(int articleId);
    void addDepartment(Department article);
    void updateDepartment(Department article);
    void deleteDepartment(int articleId);
	boolean departmentExists(String name);
}
 