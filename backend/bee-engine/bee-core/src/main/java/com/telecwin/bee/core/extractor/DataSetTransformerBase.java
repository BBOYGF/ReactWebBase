package com.telecwin.bee.core.extractor;

/**
 * 数据集变换器的基础类
 * <p>为子类实现 DataSetTransformer 接口提供便利。</p>
 */
public abstract class DataSetTransformerBase implements DataSetTransformer {
    /**
     * 变换器的名称
     */
    private String name;

    /**
     * 备注
     */
    private String description;

    /**
     * 本变换器是否会修改数据集字段信息,即结构信息
     */
    private boolean changeStructure;
}
