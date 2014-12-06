package com.demo.spring;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringDemo {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		//Triangle t = new Triangle();
		AbstractApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		context.registerShutdownHook();
		Triangle t = (Triangle)context.getBean("triangle-alias");
		t.display();

	}

}
