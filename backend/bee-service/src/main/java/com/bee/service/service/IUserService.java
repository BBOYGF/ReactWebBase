package com.bee.service.service;

import com.bee.service.pojo.RespBean;
import com.bee.service.pojo.Role;
import com.bee.service.pojo.User;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author guofan
 * @since 2022-06-22
 */
public interface IUserService extends IService<User> {
    RespBean login(String username, String password, HttpServletRequest request);

    User getUserByUserName(String name);

    List<Role> getRole(Integer id);
}
