package com.telecwin.bee.store;

/**
 * 数据集列类型
 * <p>总共就三种：文本、数值和时间类型</p>
 */
public enum DatasetColumnType {
    /**
     * 文本
     */
    TEXT,

    /**
     * 数字，可以是整数、浮点数，是精确值，即都按 Decimal 类型存储，只有0位小数则为整数
     */
    NUMBER,

    /**
     * 时间，总是包含日期和时间
     */
    TIME
}
