package com.telecwin.bee.store;

import java.util.List;

/**
 * 数据集结构信息
 * <p>包含数据集的列定义</p>
 */
public class DatasetMeta {
    /**
     * 列信息
     */
    private List<DatasetColumnMeta> columMetaList;

    public List<DatasetColumnMeta> getColumMetaList() {
        return columMetaList;
    }

    public void setColumMetaList(List<DatasetColumnMeta> columMetaList) {
        this.columMetaList = columMetaList;
    }
}
