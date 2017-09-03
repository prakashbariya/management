package com.management.service;

import java.util.List;

import com.management.entity.Department;

public interface IDepartmentService {
     List<Department> getAllDepartments();
     Department getDepartmentById(int articleId);
     boolean addDepartment(Department article);
     void updateDepartment(Department article);
     void deleteDepartment(int articleId);
}
