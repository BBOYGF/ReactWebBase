package com.bee.service.mapper;

import com.bee.service.pojo.Menu;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author guofan
 * @since 2022-06-23
 */
public interface MenuMapper extends BaseMapper<Menu> {
    List<Menu> getMenusById(int id);

    List<Menu> getMenusWithRole();

    List<Menu> getAllMenus();
}
