package com.bee.service.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 统一返bean
 *
 * @author guofan
 * @date 2022/6/22
 */
public class RespBean {
    private long code;
    private String message;
    private Object obj;

    //成功返回
    public static RespBean success(String message) {
        return new RespBean(200, message, null);
    }

    //成功返回返回
    public static RespBean success(String message, Object obj) {
        return new RespBean(200, message, obj);
    }

    //失败返回
    public static RespBean error(String message) {
        return new RespBean(500, message, null);
    }

    //失败返回对象
    public static RespBean error(String message, Object obj) {
        return new RespBean(500, message, obj);
    }

    public RespBean(long code, String message, Object obj) {
        this.code = code;
        this.message = message;
        this.obj = obj;
    }

    public long getCode() {
        return code;
    }

    public void setCode(long code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }
}
