import React, {Fragment} from "react";
import {Dropdown, Tabs, Layout} from 'element-react';
import BusinessList from "./BusinessList";

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
              <i className="fas fa-database" style={{marginRight: 5}}/>
            数据列表<i className="el-icon-caret-bottom el-icon--right"/>
          </span>
                </Dropdown>
            </section>
            <section className="content" >

                <Layout.Row>
                    <Layout.Col xs="4" sm="4" md="4" lg="4" >
                        <div>
                            <Tabs activeName="2" onTabClick={(tab) => console.log(tab.props.name)}>
                                <Tabs.Pane label="数据列表" name="1">
                                        <BusinessList/>
                                </Tabs.Pane>
                                <Tabs.Pane label="用户自助数据集" name="2">用户自助数据集</Tabs.Pane>
                            </Tabs>
                        </div>
                    </Layout.Col>
                    <Layout.Col xs="20" sm="20" md="20" lg="20">
                        <div style={{height: '75vh'}}>
                        </div>
                    </Layout.Col>
                </Layout.Row>


            </section>

        </Fragment>
    );
}

export default DataImportPage;