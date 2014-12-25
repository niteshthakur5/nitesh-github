package com.student.rest.mybatis.mapper;

import com.student.rest.domain.Student;
import com.student.rest.domain.StudentExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface StudentMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated Thu Dec 25 15:38:32 IST 2014
     */
    int countByExample(StudentExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated Thu Dec 25 15:38:32 IST 2014
     */
    int deleteByExample(StudentExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated Thu Dec 25 15:38:32 IST 2014
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated Thu Dec 25 15:38:32 IST 2014
     */
    int insert(Student record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated Thu Dec 25 15:38:32 IST 2014
     */
    int insertSelective(Student record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated Thu Dec 25 15:38:32 IST 2014
     */
    List<Student> selectByExample(StudentExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated Thu Dec 25 15:38:32 IST 2014
     */
    Student selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated Thu Dec 25 15:38:32 IST 2014
     */
    int updateByExampleSelective(@Param("record") Student record, @Param("example") StudentExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated Thu Dec 25 15:38:32 IST 2014
     */
    int updateByExample(@Param("record") Student record, @Param("example") StudentExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated Thu Dec 25 15:38:32 IST 2014
     */
    int updateByPrimaryKeySelective(Student record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated Thu Dec 25 15:38:32 IST 2014
     */
    int updateByPrimaryKey(Student record);
}