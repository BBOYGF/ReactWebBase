import React, {Fragment} from "react";
import {Dropdown, Tabs, Layout} from 'element-react';

function DataImportPage() {
    return (
        <Fragment>
            <section className="content-header" style={{background: "#e0eafc"}}>
                <Dropdown trigger="click" menu={(
                    <Dropdown.Menu>
                        <Dropdown.Item>抽取数据</Dropdown.Item>
                        <Dropdown.Item>实时数据</Dropdown.Item>
                    </Dropdown.Menu>
                )} menuAlign="start">
          <span className="el-dropdown-link">
              <i className="fas fa-database" style={{marginRight: 5}}></i>
            数据列表<i className="el-icon-caret-bottom el-icon--right"></i>
          </span>
                </Dropdown>
            </section>
            <section className="content" style={{background:"red"}}>

                <Layout.Row >
                    <Layout.Col xs="3" sm="3" md="3" lg="3">
                        <div>
                            <Tabs activeName="2" onTabClick={(tab) => console.log(tab.props.name)}>
                                <Tabs.Pane label="数据列表" name="1">数据列表</Tabs.Pane>
                                <Tabs.Pane label="用户自助数据集" name="2">用户自助数据集</Tabs.Pane>
                            </Tabs>
                        </div>
                    </Layout.Col>
                    <Layout.Col xs="21" sm="21" md="21" lg="21">
                        <div  style={{background:'black',height:'85vh'}}>

                        </div>
                    </Layout.Col>
                </Layout.Row>


            </section>

        </Fragment>
    );
}

export default DataImportPage;