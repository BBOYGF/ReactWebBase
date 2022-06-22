package com.bee.service.configuration.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * security 配置类
 *
 * @author guofan
 * @date 2022/6/22
 */
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().passwordEncoder(new BCryptPasswordEncoder())
                .withUser("guofan@123.com").password(new BCryptPasswordEncoder()
                .encode("123")).roles("manager")
                .and().withUser("15").password(new BCryptPasswordEncoder().encode(""))
                .roles("laboratory");
        System.out.println("认证了");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/").permitAll()//设置所有人能访问/请求
                .antMatchers("/adduser", "/index", "/main")
                .hasAnyRole("manager");//设置管理员角色访问的路径//设置登录地址
        http.formLogin().loginPage("/toLogin").loginProcessingUrl("/login")
                .usernameParameter("username").passwordParameter("password");
    }
}
