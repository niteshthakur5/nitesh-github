package com.spring.rest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.rest.model.Employee;

@Component
@Path("emp")
public class EmployeeController {
	private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);
	Map<Integer, Employee> empData = new HashMap<Integer, Employee>();
	
	@GET
	@Path("dummy")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	//@RequestMapping(value= EmpRestURIConstants.DUMMY_EMP, method = RequestMethod.GET)
	public @ResponseBody Employee getDummyEmployee(){
		logger.info("Start getDummyEmployee");
		Employee emp = new Employee();
		emp.setId(101);
		emp.setName("NITESH");
		emp.setAge(24);
		empData.put(101, emp);
		return emp;
		
	}
	
	@GET
	@Path("show/{id}")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	//@RequestMapping(value = EmpRestURIConstants.GET_EMP, method = RequestMethod.GET)
	public @ResponseBody Employee getEmployee(@PathVariable("id") int empId){
		logger.info("start getEmplyee. ID = "+empId);
		return empData.get(empId);
	}
	
	@GET
	@Path("showall")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	//@RequestMapping(value = EmpRestURIConstants.GET_ALL_EMP, method = RequestMethod.GET)
	public @ResponseBody List<Employee> getAllEmployees(){
		logger.info("start getAllEmployees.");
		List<Employee> emps = new ArrayList<Employee>();
		Set<Integer> empIdKeys = empData.keySet();
		for(Integer i : empIdKeys){
			emps.add(empData.get(i));
		}
		return emps;
	}
	
	@POST
	@Path("create")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	//@RequestMapping(value = EmpRestURIConstants.CREATE_EMP, method = RequestMethod.POST)
	public @ResponseBody Employee createEmployee(@RequestBody Employee emp){
		logger.info("start createEmployee.");
		empData.put(emp.getId(), emp);
		return emp;
	}
	
	@PUT
	@Path("update/{id}")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	//@RequestMapping(value = EmpRestURIConstants.DELETE_EMP, method = RequestMethod.PUT)
	public @ResponseBody Employee deleteEmployee(@PathVariable("id") int empId){
		logger.info("start deleteEmployee.");
		Employee emp = empData.get(empId);
		empData.remove(empId);
		return emp;
	}
	
	
}
