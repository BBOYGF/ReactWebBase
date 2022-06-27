package com.bee.service.configuration.security.component;


import com.bee.service.mapper.MenuMapper;
import com.bee.service.pojo.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import com.bee.service.pojo.Menu;
import java.util.Collection;
import java.util.List;

/**
 * 权限控制
 * 根据url分析所需的角色
 * @author fan
 */
@Component
public class CustomFilter implements FilterInvocationSecurityMetadataSource {
    @Autowired
    private MenuMapper menuMapper;
    private final AntPathMatcher antPathMatcher=new AntPathMatcher();
    @Override
    public Collection<ConfigAttribute> getAttributes(Object o) throws IllegalArgumentException {
        //获取请求的URL
        String requestUrl = ((FilterInvocation) o).getRequestUrl();
        List<Menu> menusWithRole = menuMapper.getMenusWithRole();
        for(Menu menu: menusWithRole){
            //判断请求URL与菜单是否匹配
            if(antPathMatcher.match(menu.getUrl(),requestUrl)){
                String[] str=menu.getRoles().stream().map(Role::getName).toArray(String[]::new);
                return SecurityConfig.createList(str);
            }
        }
        return SecurityConfig.createList("ROLE_LOGIN");
    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return null;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return false;
    }
}
