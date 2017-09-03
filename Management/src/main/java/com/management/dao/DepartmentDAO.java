package com.management.dao;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.management.entity.Department;
@Transactional
@Repository
public class DepartmentDAO implements IDepartmentDAO {
	
	@PersistenceContext	
	private EntityManager entityManager;	
	@Override
	public Department getDepartmentById(int departmentId) {
		return entityManager.find(Department.class, departmentId);
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Department> getAllDepartments() {
		String hql = "FROM Department as department ORDER BY department.departmentId";
		return (List<Department>) entityManager.createQuery(hql).getResultList();
	}	
	@Override
	public void addDepartment(Department department) {
		entityManager.persist(department);
	}
	@Override
	public void updateDepartment(Department departmentNew) {
		Department departmentOld = getDepartmentById(departmentNew.getDepartmentId());
		departmentOld.setName(departmentNew.getName());
		entityManager.flush();
	}
	@Override
	public void deleteDepartment(int departmentId) {
		entityManager.remove(getDepartmentById(departmentId));
	}

	public boolean departmentExists(String name) {
		String hql = "FROM Department as department WHERE department.name = ? ";
		int count = entityManager.createQuery(hql).setParameter(1, name).getResultList().size();
		return count > 0 ? true : false;
	}
}
