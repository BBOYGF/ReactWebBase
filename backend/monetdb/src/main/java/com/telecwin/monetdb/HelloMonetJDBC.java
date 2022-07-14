package com.telecwin.monetdb;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class HelloMonetJDBC {
    private static final Logger logger = LoggerFactory.getLogger(MonetDbHelloWorld.class);

    public static void main(String[] args) throws SQLException, UnsupportedEncodingException {
        String dbUrl = "jdbc:monetdb://localhost:50000/mdb-10m";
        long start = System.currentTimeMillis();
        Connection connection = DriverManager.getConnection(dbUrl, "guofan", "guofan");
        long end = System.currentTimeMillis();
        logger.debug("获取连接耗时：{} ms", end-start);
        MonetDbHelloWorld monetDbHelloWorld = new MonetDbHelloWorld();
        monetDbHelloWorld.testQuery(connection,
                "select * from guofan.s订单 limit 10;"
        );
    }
}
