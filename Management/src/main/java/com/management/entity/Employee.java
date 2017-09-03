package com.management.entity;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name="Employee")
public class Employee implements Serializable { 
	private static final long serialVersionUID = 2L;
	@Id
	@GeneratedValue(generator = "table", strategy=GenerationType.TABLE)
	@TableGenerator(name = "table", allocationSize = 1)
	@Column(name="emp_id")
    private int employeeId;  
	@Column(name="name")
    private String name;
	@Column(name="email")	
	private String email;
	
	
	@ManyToOne
	@JoinColumn(name="department_id", nullable=false)
	private Department department;
	
	public String getName() {
		return name;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}
	
	
} 