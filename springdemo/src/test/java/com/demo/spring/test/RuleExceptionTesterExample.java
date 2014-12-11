package com.demo.spring.test;
import com.demo.spring.MyClass;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;


public class RuleExceptionTesterExample {

  @Rule
  public ExpectedException exception = ExpectedException.none();

  @Test
  public void throwsIllegalArgumentExceptionIfIconIsNull() {
    exception.expect(IllegalArgumentException.class);
    exception.expectMessage("Negative value not allowed");
    MyClass t = new MyClass();
    t.isNegative(-858);
  }
} 