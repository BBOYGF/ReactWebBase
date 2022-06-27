package com.bee.service.controller;

import com.bee.service.pojo.RespBean;
import com.bee.service.pojo.User;
import com.bee.service.pojo.UserLogin;
import com.bee.service.service.IUserService;
import com.bee.service.service.impl.UserServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@Log
@RestController
@Api(tags = "LoginController")
public class LoginContrller {
    @Autowired
    private IUserService userService;

    @ApiOperation("登录后返回token")
    @PostMapping("/login")
    public RespBean login(@RequestBody UserLogin userLogin, HttpServletRequest request) {
        System.out.println(userLogin.getPassword());
        return userService.login(userLogin.getUsername(), userLogin.getPassword(), request);
    }

    @ApiOperation("退出登录")
    @PostMapping("/logout")
    public RespBean logout() {
        return RespBean.success("注销成功");
    }

    @ApiOperation("获取当前用户信息")
    @GetMapping("/user/info")
    public User getUserInfo(Principal principal) {
        if (null == principal) {
            return null;
        }
        String name = principal.getName();
        User user = userService.getUserByUserName(name);
        user.setPassword(null);
        user.setRoles(userService.getRole(user.getId()));
        return user;
    }
}


