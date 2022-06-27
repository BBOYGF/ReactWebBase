package com.bee.service.mapper;

import com.bee.service.pojo.Role;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author guofan
 * @since 2022-06-22
 */
public interface RoleMapper extends BaseMapper<Role> {
    List<Role> getRole(Integer userID);
}
