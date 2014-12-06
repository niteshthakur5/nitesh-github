package com.demo.spring;

import java.util.List;

import org.springframework.beans.factory.BeanNameAware;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;

public class Triangle implements BeanNameAware, InitializingBean,DisposableBean {
	
	private List<Point> points;
	public List<Point> getPoints() {
		return points;
	}
	public void setPoints(List<Point> points) {
		this.points = points;
	}
	/*private Point point1;
	private Point point2;
	private Point point3;
	
	public Point getPoint1() {
		return point1;
	}
	public Point getPoint2() {
		return point2;
	}
	public Point getPoint3() {
		return point3;
	}
	public void setPoint1(Point point1) {
		this.point1 = point1;
	}
	public void setPoint2(Point point2) {
		this.point2 = point2;
	}
	public void setPoint3(Point point3) {
		this.point3 = point3;
	}
	private String type;
	private int height;
	//constructor
	public Triangle(){}
	public Triangle(String type,int height){
		this.type = type;
		this.height = height;
	}
	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
*/
	public void display(){
		for(Point point: points)
			System.out.println("point("+ point.getX()+","+point.getY()+")");	
//		System.out.println("Triangle : \nfirst point("+ getPoint1().getX()+","+getPoint1().getY()+")");
//		System.out.println("second point("+ getPoint2().getX()+","+getPoint2().getY()+")");
//		System.out.println("third point("+ getPoint3().getX()+","+getPoint3().getY()+")");

	}
	public void setBeanName(String beanName) {
		System.out.println("Bean name is: "+ beanName);
		
	}
	public void afterPropertiesSet() throws Exception {
		System.out.println("Initilizing bean....");
	}
	public void destroy() throws Exception {
		System.out.println("Destroying bean...");
	}
	
}
