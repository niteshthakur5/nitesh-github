package com.student.rest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseBody;

import com.student.rest.domain.Student;
import com.student.rest.domain.StudentExample;
import com.student.rest.domain.StudentExample.Criteria;
import com.student.rest.mybatis.mapper.StudentMapper;


import javax.ws.rs.core.MediaType;
@Component
@Path("student")
public class StudentController {
	
	@Autowired
	StudentMapper sm;
	private static final Logger logger = LoggerFactory.getLogger(StudentController.class);
	Map<String, String> errorMsg = new HashMap<String, String>();
	
	/*@GET
	@Path("dummy")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public @ResponseBody Student getDummyStudent(){
		logger.info("Start getDummyStudent");
		Student s = new Student();
		s.setId(101);
		s.setName("NITESH");
		s.setCourse("MCA");
		s.setAge(24);
		empData.put(101, s);
		return s;
		
	}
	
	@GET
	@Path("showall")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public @ResponseBody ArrayList<Map> getAllStudent(){
		logger.info("Start getAllStudent");
		ArrayList<Map> arr = new ArrayList<Map>();
		Student s = new Student();
		Student s2 = new Student();
		s.setId(101);
		s.setName("NITESH");
		s.setCourse("MCA");
		s.setAge(24);
		empData.put(101, s);
		s2.setId(102);
		s2.setName("SHASHANK");
		s2.setCourse("ME");
		s2.setAge(25);
		empData.put(102, s2);
		arr.add(empData);
		return arr;
		
	}
	*/
	@POST
	@Path("create")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public @ResponseBody Map<String, String> addStudent(@FormParam("name") String name,
														@FormParam("course") String course, 
														@FormParam("age") int age){ 
				
		Student record = new Student();
		record.setName(name);
		record.setAge(age);
		record.setCourse(course);
		int i = sm.insertSelective(record);
		if(i != 0){
			errorMsg.put("msg", "Succesfully created");
			return errorMsg;
		}
		errorMsg.put("msg", "Error Ocurred");
		return errorMsg;
	}	
	
	@GET
	@Path("showall")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public @ResponseBody ArrayList<Map> getAllStudent(@QueryParam("limit") int l){
		
		List<Student> arr = new ArrayList<Student>();
		ArrayList<Map> result = new ArrayList<Map>();
		StudentExample ex = new StudentExample();
		
		//ex.setOrderByClause(orderBy);
		arr = sm.selectByExample(ex);
		for (Student student : arr) {
			Map<Integer, Object> map = new HashMap<Integer, Object>();
			Student s = new Student();
			s.setId(student.getId());
			s.setName(student.getName());
			s.setCourse(student.getCourse());
			s.setAge(student.getAge());
			map.put(student.getId(), s);
			result.add(map);
		}
		return result;
		
	}
	
	@GET
	@Path("show/{id}")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public @ResponseBody Map<Integer, Object> getStudent(@PathParam("id") int id){
		
		Map<Integer, Object> map = new HashMap<Integer, Object>();
		Student s = new Student();
		s = sm.selectByPrimaryKey(id);
		if(s != null){
			map.put(s.getId(), s);
			return map;
		}
		map.put(-1, "Record doesn't exist");
		return map;
	}
	
	@DELETE
    @Path("delete/{id}/")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public @ResponseBody Map<String, String> dropStudent(@PathParam("id") int id){
		Map<String, String> map = new HashMap<String,String>();
		int i = sm.deleteByPrimaryKey(id);
		if(i>0){
			map.put("msg", "Successfully Deleted");
			return map;
		}
		map.put("msg", "Error ocurred");
		return map;
	}
	
	@PUT
	@Path("update/{id}/")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Map<String, String> updateStudent(@PathParam("id") int id,
											 @FormParam("name") String name,
											 @FormParam("course") String course, 
											 @FormParam("age") int age){
		Map<String, String> map = new HashMap<String, String>();
		Student s = new Student();
		s.setId(id);
		s.setAge(age);
		s.setCourse(course);
		s.setName(name);
		int i = sm.updateByPrimaryKey(s);
		if(i == 0){
			map.put("msg", "Record doesn't exist");
			return map;
		}
		map.put("msg", "Updated Successfully");
		return map;
		
	}
	
	
}
