package com.bee.service.pojo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;



@ApiModel(value="AdimnLogin对象",description = "")
public class UserLogin {
    @ApiModelProperty(value="用户名",required = true)
    private String username;
    @ApiModelProperty(value="密码",required = true)
    private String password;
//    @ApiModelProperty(value="验证码",required = true)
//    private String code;

    public UserLogin(String username, String password, String code) {
        this.username = username;
        this.password = password;
//        this.code = code;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
