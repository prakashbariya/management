package com.management.dao;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.management.entity.Employee;
@Transactional
@Repository
public class EmployeeDAO implements IEmployeeDAO {
	
	@PersistenceContext	
	private EntityManager entityManager;	
	@Override
	public Employee getEmployeeById(int employeeId) {
		return entityManager.find(Employee.class, employeeId);
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Employee> getAllEmployees() {
		String hql = "FROM Employee as emp ORDER BY emp.employeeId";
		return (List<Employee>) entityManager.createQuery(hql).getResultList();
	}	
	@Override
	public void addEmployee(Employee employee) {
		entityManager.persist(employee);
	}
	@Override
	public void updateEmployee(Employee employeeNew) {
		Employee employeeOld = getEmployeeById(employeeNew.getEmployeeId());
		employeeOld.setName(employeeNew.getName());
		employeeOld.setEmail(employeeNew.getEmail());
		entityManager.flush();
	}
	@Override
	public void deleteEmployee(int employeeId) {
		entityManager.remove(getEmployeeById(employeeId));
	}
	@Override
	public boolean employeeExists(String name, String email) {
		String hql = "FROM Employee as emp WHERE emp.name = ? and emp.email = ?";
		int count = entityManager.createQuery(hql).setParameter(1, name)
		              .setParameter(2, email).getResultList().size();
		return count > 0 ? true : false;
	}
}
