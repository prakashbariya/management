package com.management.entity;
import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name="Department")
public class Department implements Serializable { 
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(generator = "table", strategy=GenerationType.TABLE)
	@TableGenerator(name = "table", allocationSize = 1)
	@Column(name="department_id")
    private int departmentId;  
	@Column(name="name")
    private String name;
	
	@JsonIgnore
	@OneToMany(mappedBy="department")
	private Set<Employee> employees;


	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Employee> getEmployees() {
		return employees;
	}

	public void setEmployees(Set<Employee> employees) {
		this.employees = employees;
	}
	
	
} 