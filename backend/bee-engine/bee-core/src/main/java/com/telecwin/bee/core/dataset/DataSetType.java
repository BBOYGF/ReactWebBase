package com.telecwin.bee.core.dataset;

/**
 * 数据集类型枚举
 */
public enum DataSetType {
    /**
     * 数据库表类型的数据集
     */
    DATABASE_DATASET,
    /**
     * excel、csv类型数据集
     */
    EXCEL_DATASET,
    /**
     * SQL文件类型的数据集
     */
    SQL_DATASET,
    /**
     * 自定义数据集，从其他数据集生成的数据集
     */
    CUSTOM_DATASET
}
