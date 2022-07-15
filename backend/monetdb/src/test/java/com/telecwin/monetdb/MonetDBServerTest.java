package com.telecwin.monetdb;

import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;

class MonetDBServerTest {

    MonetDBServer server = new MonetDBServer(
            // exe
            new File("e:\\BI\\monetdb\\bin\\mserver5.exe"),
            // 数据库路径
            new File("e:\\BI\\monet-test-db\\mdb-10m\\"));

    MonetDBServerTest() throws IOException {
    }

    @Test
    void startServer() throws IOException {
        server.startServer();
        server.waitServiceStop(1000*10);
    }

    @Test
    void stopServer() {

    }

    @Test
    void isRunning() {
    }
}