package com.telecwin.bee.store;

import java.sql.ResultSet;

/**
 * 数据集
 * <p>
 *     类似于数据库中的一张表。存放抽取而来的数据，为分析做准备。<br/>
 *     他的作用是将来自不同数据源的数据统一存放，供后续分析使用。数据来源可以有：数据库、Excel/csv文件等。
 * </p>
 *
 * @author yangbo
 */
public interface Dataset {
    /**
     * 每个数据集(Dataset)都有一个唯一标识串，是一个 UUID 串。
     *
     * @return 数据集的唯一标识
     */
    String getId();

    /**
     * 设置数据集的 id 串。
     */
    void setId(String id);

    /**
     * 查询数据集
     * @param sql 查询语句
     * @return 查询结果
     */
    ResultSet query(String sql);
}
