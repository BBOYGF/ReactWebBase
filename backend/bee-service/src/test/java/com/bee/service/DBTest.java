package com.bee.service;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.*;
import java.util.Properties;

/**
 * @author guofan
 * @date 2022/7/14
 */
@SpringBootTest
@RunWith(SpringRunner.class)
public class DBTest {
    org.slf4j.Logger logger = LoggerFactory.getLogger(getClass());

    @Test
    public void monetDBTest() throws SQLException, ClassNotFoundException, InstantiationException, IllegalAccessException {
        logger.info("=======================测试============================");
        Class.forName("org.monetdb.jdbc.MonetDriver");
        Connection ct= DriverManager.getConnection("jdbc:monetdb://localhost:50000/mdb-10m","monetdb","monetdb");
        testQuery(ct,
                "select 货主名称,sum(应付金额) from sys.订单 group by 货主名称;"
        );
    }
    public void testQuery(Connection conn, String sql) throws SQLException {
        //Query table
        Statement s = conn.createStatement();
        long start = System.currentTimeMillis();
        String select = "SELECT * FROM example;";
        if (sql != null) {
            select = sql;
        }
        ResultSet rs = s.executeQuery(select);
        long queryEnd = System.currentTimeMillis();
        logger.info("查询耗时：{} ms", (queryEnd - start));
        //Fetch results
        int i = 0;
        while (rs.next()) {
            //Get columns
            rs.getInt(2);
            String col2 = "";
            if (s.getMaxFieldSize() > 1) {
                col2 = rs.getString(2);
            }
            logger.info("记录{}：{}, {}", i, rs.getInt(2), col2);
            i++;
        }
        logger.info("读取结果耗时：{} ms", (System.currentTimeMillis() - queryEnd));
    }

    public static void main(String[] args) throws SQLException, ClassNotFoundException, InstantiationException, IllegalAccessException {
        DBTest dbTest = new DBTest();
        dbTest.monetDBTest();
    }
}
