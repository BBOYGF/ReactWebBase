package com.bee.service.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.bee.service.configuration.security.component.JwtTokenUtil;
import com.bee.service.mapper.RoleMapper;
import com.bee.service.pojo.RespBean;
import com.bee.service.pojo.Role;
import com.bee.service.pojo.User;
import com.bee.service.mapper.UserMapper;
import com.bee.service.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author guofan
 * @since 2022-06-22
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RoleMapper roleMapper;

    //注入userDatailService
    @Autowired
    private UserDetailsService userDetailsService;
    //注入解码器
    @Autowired
    private PasswordEncoder passwordEncoder;
    //注入JWT工具类
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    //获取头部信息
    @Value("${jwt.tokenHead}")
    private String tokenHead;


    public User getUserByUserName(String username) {
        User user = userMapper.selectOne(new QueryWrapper<User>().eq("username", username));
        return user;
    }

    public List<Role> getRole(Integer userID) {
        List<Role> role = roleMapper.getRole(userID);
        return role;
    }

    //登录后返回Token
    public RespBean login(String username, String password, HttpServletRequest request) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        System.out.println("需要的密码是：" +passwordEncoder.encode(userDetails.getPassword()));
        if (null == userDetails || !passwordEncoder.matches(password, userDetails.getPassword())) {
            return RespBean.error("用户名或者密码不正确");
        }
        if (!userDetails.isEnabled()) {
            return RespBean.error("账户被禁用，请联系管理员！");
        }
        //更新security登录用户对象
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        //生成token
        String token = jwtTokenUtil.generateToken(userDetails);
        Map<String, String> tokenMap = new HashMap<String, String>();
        tokenMap.put("token", token);
        tokenMap.put("tokenHead", tokenHead);
        return RespBean.success("登录成功", tokenMap);
    }

}
