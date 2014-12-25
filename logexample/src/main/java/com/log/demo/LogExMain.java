package com.log.demo;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogExMain {

	/**
	 * @param args
	 */
	
		private static Logger LOG = LoggerFactory.getLogger(LogExMain.class);
		
		public void sayHello(String name) {
			String s = "Nitesh thakur";
			String[] a = s.split("<br>");
			System.out.println(a.length);
			for (String string : a) {
				System.out.println(string);
			}
		
			
			ArrayList<Integer> l = new ArrayList<Integer>();
			l.add(10);
			l.add(20);
			LOG.info("sfs : "+l);
	        LOG.info("Hi, {}", name);
	        int i = 10;
	        LOG.info("welcome"+ i);
	        LOG.debug("parameter is : {}",name);
	        try{
	        	int c = 10/0;
	        }catch (Exception e) {
				e.printStackTrace();
				LOG.error("err",e);
			}
	    }
		public static void main(String[] args) {
	        LogExMain logex = new LogExMain();
	        logex.sayHello("Nitesh");
	    }
	

}
