package com.telecwin.monetdb;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.TimeoutException;

/**
 * 管理 MonetDB 服务进程的类。
 * <pre>
 * 可以实现：
 * 1、启动数据库服务进程
 * 2、检查进程是否启动、正在侦听端口
 * 3、停止服务进程
 * </pre>
 */
public class MonetDBServer {
    /**
     * 缺省端口
     */
    private static int DEFAULT_PORT = 50000;

    /**
     * mserver5.exe 的路径
     */
    private File exePath;
    /**
     * MonetDB 的根路径，即包含 bin/, lib/ 的目录
     */
    private File baseDir;

    /**
     * 数据库路径
     */
    private File dbPath;

    /**
     * @param exePath 服务程序 mserver5.exe 的路径
     * @param dbPath  数据库路径
     */
    MonetDBServer(File exePath, File dbPath) throws IOException {
        this.exePath = exePath.getCanonicalFile();
        this.baseDir = exePath.getParentFile().getCanonicalFile();
        this.dbPath = dbPath.getCanonicalFile();
    }

    /**
     * 启动数据库服务进程
     *
     * @return 记录终端输出的日志文件
     */
    public File startServer() throws IOException {
        // 1. 扩展 PATH 环境变量，加入 monetDB 的 bin/ 和 lib/ 目录
        // 2. 设置 dbpath 路径
        // 3. 启动进程，记录终端输出到日志文件

        // 1.  扩展 PATH 环境变量，加入 monetDB 的 bin/ 和 lib/ 目录
        String path = System.getenv("PATH");
        File bin = new File(baseDir, "bin");
        File lib = new File(baseDir, "lib/monetdb5");
        path = String.format("%s;%s;%s", bin, lib, path);
        System.getenv().put("PATH", path);

        // 2. 设置 dbpath 路径
        // 3. 启动进程
        // "%MONETDB%\bin\mserver5.exe" --set "prefix=%MONETDB%" --set %MONETDBPYTHONUDF% --set "exec_prefix=%MONETDB%" --set mal_for_all=yes %MONETDBFARM% %*
        ProcessBuilder procBuilder = new ProcessBuilder(this.exePath.toString(),
                // 末尾不能有 "/" 符号
                "--set", "prefix=" + this.exePath.getPath(),
                "--set", "embedded_py=false",
                "--set", "exec_prefix=" + this.exePath.getPath(),
                "--set", "mal_for_all=yes",
                "--dbpath=" + this.dbPath
        );
        return null;
    }

    public void stopServer() {

    }

    /**
     * 获取服务是否运行的状态，可以用阻塞的方式查询，并可以设置超时时间，超时则抛出异常。
     *
     * @return true 表示服务进程已经启动，正在运行；false 表示服务未运行。
     */
    public boolean isRunning(long timeout) throws TimeoutException {
        return false;
    }
}
