package com.demo.spring.test;

import static org.junit.Assert.*;

import java.util.Arrays;
import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;
import com.demo.spring.PersonDAL;
import com.demo.spring.Person;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class PersonDALTest {
	private static PersonDAL mockedPersonDAL;
	private static Person p1;
	private static Person p2;
	@BeforeClass
	public static void setUp(){
		mockedPersonDAL = mock(PersonDAL.class);
		p1 = new Person("nitesh",24);
		p2 = new Person("shshank",25);
		
		when(mockedPersonDAL.getAllPersons()).thenReturn(Arrays.asList(p1,p2));
		when(mockedPersonDAL.getPerson("nitesh")).thenReturn(p1);
		
	}
	@Test
	public void testGetAllPersons() {
		List<Person> allPersons = mockedPersonDAL.getAllPersons();
		assertEquals(2, allPersons.size());
		Person per = allPersons.get(0);
		assertEquals("nitesh", per.getName());
		assertEquals(24,per.getAge());
	}

	@Test
	public void testGetBook() {
		Person per = mockedPersonDAL.getPerson("nitesh");
		assertNotNull(per);
	}

}
