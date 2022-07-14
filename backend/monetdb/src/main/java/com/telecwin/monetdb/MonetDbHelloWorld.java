package com.telecwin.monetdb;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.sql.*;
import java.util.Properties;

/**
 * 测试用 Monetdbe-java 直接打开数据库文件
 * <pre>
 * MonetDBe 支持内存数据库，Valid MonetDBe-Java URLs:
 * - In-memory database: jdbc:monetdb:memory:
 * - Local file database: jdbc:monetdb:file:/path/to/directory/
 * - Remote database: mapi:monetdb://<host>[:<port>]/<database>
 * </pre>
 */
public class MonetDbHelloWorld {
    private static final Logger logger = LoggerFactory.getLogger(MonetDbHelloWorld.class);

    public static void main(String[] args) throws SQLException, InterruptedException {
        MonetDbHelloWorld helloWorld = new MonetDbHelloWorld();
        // 内存数据库测试
        // helloWorld.createMemoryDb();

        // 文件数据库测试
        // helloWorld.testFileDatabase();

        // 读取文件数据库测试
        helloWorld.testReadFileDatabase();
    }

    public void createMemoryDb() {
        try {
            //Connect to in-memory database
            Properties props = new Properties();
            props.setProperty("autocommit", "false");
            Connection conn = DriverManager.getConnection("jdbc:monetdb:memory:", props);
            testDatabase(conn);
        } catch (SQLException e) {
            logger.error("创建数据库失败！", e);
        }
    }

    private void testDatabase(Connection conn) throws SQLException {
        //Create table and insert values
        Statement s = conn.createStatement();
        s.executeUpdate("start transaction;");
        s.executeUpdate("CREATE TABLE example (i INTEGER, s STRING);");
        long start = System.currentTimeMillis();
        int batchSize = 100_000;
        for (int idx = 0; idx < batchSize; idx++) {
            s.executeUpdate("INSERT INTO example VALUES (19,'hello'), (17,'world');");
        }
        conn.commit();
        long end = System.currentTimeMillis();
        long costSeconds = (end - start) / 1000;
        logger.debug("插入{}记录，耗时: {} 秒，速度：{} tps", batchSize, costSeconds, batchSize / costSeconds);
        testQuery(conn, null);
        //Close connection
        conn.close();
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
        logger.debug("查询耗时：{} ms", (queryEnd - start));
        //Fetch results
        int i = 0;
        while (rs.next()) {
            //Get columns
            rs.getInt(1);
            String col2 = "";
            if (s.getMaxFieldSize() > 1) {
                col2 = rs.getString(2);
            }
            logger.debug("记录{}：{}, {}", i, rs.getInt(1), col2);
            i++;
        }
        logger.debug("读取结果耗时：{} ms", (System.currentTimeMillis() - queryEnd));
    }

    public void testFileDatabase() throws SQLException {
        System.out.println(System.getProperty("user.dir"));
        String dbpath = "e:\\BI\\monet-test-db";
//        String dbUrl = "jdbc:monetdb:file:/" + dbpath;
        String dbUrl = "jdbc:monetdb:file:" + System.getProperty("user.dir") + "/../testdata/localdb";
        File dbpathFile = new File(dbpath);
        dbpathFile.mkdirs();
        Connection connection = DriverManager.getConnection(dbUrl, null);
        testDatabase(connection);
    }

    public void testReadFileDatabase() throws SQLException, InterruptedException {
        // String dbUrl = "jdbc:monetdb:file:" + System.getProperty("user.dir") + "/../testdata/localdb";
//        String dbUrl = "jdbc:monetdb:file:d:\\products\\bee\\backend\\testdata\\localdb\\";
        String dbUrl = "jdbc:monetdb:file:e:/bi/monet-test-db/mdb-10m";
        logger.debug("JDBC URL: {}", dbUrl);
        long start = System.currentTimeMillis();
        Connection connection = DriverManager.getConnection(dbUrl, "guofan", "guofan");
        long end = System.currentTimeMillis();
        logger.debug("获取连接耗时：{} ms", end - start);
        testQuery(connection, null);
        // 等待一下
        Thread.sleep(1000 * 10);
    }
}
