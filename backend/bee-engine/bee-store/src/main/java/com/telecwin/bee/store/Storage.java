package com.telecwin.bee.store;

/**
 * 存储类的接口。
 * <p>
 *     Storage 的实现类负责保存抽取的数据，并提供读取和查询方法。
 *     Storage 的作用类似于数据库系统，实际上，最初也是由数据库系统实现的。
 * </p>
 *
 * @author yangbo
 */
public interface Storage {
    /**
     * 创建一个数据集，一个数据集类似于数据库中的一张表，由存储对象(Storage)管理。
     *
     * @param name 数据集的名称
     * @param namespace 数据集所属命名空间，由所属“路径”构成。
     */
    Dataset createDataset(String name, String namespace, DatasetMeta datasetMeta);

    /**
     * 用数据集id串查询得到一个数据集对象。
     * @return 数据集对象，如果没有则返回 null
     */
    Dataset getDatasetById(String datasetId);

    /**
     * 删除数据集
     * @param datasetId 数据集id
     */
    void deleteDataset(String datasetId);
}
