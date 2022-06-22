package com.bee.service.controller;


import com.bee.service.pojo.RespBean;
import com.bee.service.service.impl.UserServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author guofan
 * @since 2022-06-22
 */
@RestController
@RequestMapping("/user")
@Api(tags = "UserController")
public class UserController {

    @Autowired
    UserServiceImpl userService;

    @GetMapping("/")
    @ApiOperation(value = "获取所有用户")
    public RespBean getUser() {
        return RespBean.success("成功", userService.list());
    }

}
