package com.demo.spring;

import java.util.Collections;
import java.util.List;

public class PersonDAL {
	private static PersonDAL p = new PersonDAL();
	public List<Person> getAllPersons(){
			return Collections.EMPTY_LIST;
	}
	public Person getPerson(String name){
		return null;
	}
	public static PersonDAL getInstance(){
		return p;
	}


}
