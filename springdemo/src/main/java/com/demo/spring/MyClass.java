package com.demo.spring;

public class MyClass {
  public int multiply(int x, int y) {
     if (x > 999) {
      throw new IllegalArgumentException("X should be less than 1000");
    }
    return x * y;
  }
  public int isNegative(int x){
	  if(x<0)
		  throw new IllegalArgumentException("Negative value not allowed");
	  return x;
  }
} 
