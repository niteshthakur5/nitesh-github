package com.demo.spring;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.*;

public class testAop {
	
	public static void main(String[] args){
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		Operation op = (Operation)context.getBean("opbean");
		System.out.println("calling msg...");  
	    op.msg();  
	    System.out.println("calling m...");  
	    op.m();  
	    System.out.println("calling k...");  
	    op.k();  
	}
}
