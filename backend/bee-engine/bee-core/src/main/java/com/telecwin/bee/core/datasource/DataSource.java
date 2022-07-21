package com.telecwin.bee.core.datasource;

import java.util.List;

/**
 * 数据源
 * <p>代表抽取数据的来源，由具体实现类提供数据访问能力。</p>
 */
public abstract class DataSource {
    private String uuid;
    private String address;
    private List<DataSourceColumn> columnList;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<DataSourceColumn> getColumnList() {
        return columnList;
    }

    public void setColumnList(List<DataSourceColumn> columnList) {
        this.columnList = columnList;
    }
}
