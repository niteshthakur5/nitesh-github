package com.demo.spring.db;

import org.springframework.beans.factory.annotation.Autowired;

public class DbConnection {
	@Autowired
	private String driverClassName;
	private String url;
	private String username;
	private String password;
}
