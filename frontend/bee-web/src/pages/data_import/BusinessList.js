import React, {Component} from "react";
import {Input, Button, Layout, Dropdown} from 'element-react'


class BusinessList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{
                id: 1,
                label: '我的自助数据集',
                type: '分组',
                icon: 'fas fa-sort-down',
                opened: true,
                children: [{
                    id: 5,
                    icon: 'fas fa-address-book',
                    label: '分享给我的自助数据集',
                }, {
                    id: 6,
                    icon: 'fas fa-address-book',
                    label: '***的业务包',
                }]
            }, {
                id: 2,
                label: '分组',
                type: '分组',
                icon: 'fas fa-sort-down',
                opened: true,
                children: [{
                    id: 7,
                    icon: 'fas fa-folder-open',
                    label: '业务包2'
                }, {
                    id: 8,
                    icon: 'fas fa-folder-open',
                    label: '业务包3'
                }]
            }, {
                id: 3,
                label: '分组',
                type: '分组',
                icon: 'fas fa-sort-down',
                opened: true,
                children: [{
                    id: 9,
                    icon: 'fas fa-folder-open',
                    label: '业务包1'
                }]
            },
                {
                    id: 4,
                    label: '业务包',
                    icon: 'fas fa-folder-open',
                    opened: true,
                    type: '业务包',
                }
            ]

        }
    }

    onOpened(id) {
        let state = this.state
        let data = state.data;
        let item = data[id - 1];
        item.opened = !item.opened
        data[id - 1] = item;
        this.setState({
            data: data
        })
        return;
    }

    onHover(item) {
        item.target.style.background = '#afafaf';
        item.target.style.cursor = 'pointer';
    }

    onMouseOut(item) {
        item.target.style.background = '';
    }

    addGroup() {
        let state = this.state
        let data = state.data;
        data.push({
            id: data.length + 1,
            label: '分组',
            type: '分组',
            icon: 'fas fa-sort-down',
            opened: false,
            children: []
        })
        this.setState({
            data: data
        })
        // 添加完成更新数据库
    }

    addBusiness() {
        let state = this.state
        let data = state.data;
        data.push({
            id: data.length + 1,
            label: '业务包',
            type: '业务包',
            icon: 'fas fa-folder-open',
            opened: false,
            children: []
        })
        this.setState({
            data: data
        })
        // 添加完成更新数据库
    }

    updateItem(id, command) {
        console.log("command:" + command);
        console.log("id：" + id);
        let state = this.state
        let data = state.data;
        if (command === '重命名') {

        } else if (command === '移动到') {

        } else if (command === "删除") {

            const newData = data.filter(item => {
                return item.id !== id
            });
            for (let i = 0; i < newData.length; i++) {
                const newDatum = newData[i];
                newDatum.children = newDatum.children.filter(ite => {
                    return ite.id !== id
                })
            }
            this.setState({
                data: newData
            })
            console.log("删除数据" + newData)
        }
        console.log("执行完成")
    }

    render() {
        const {data} = this.state
        const treeList = data.map((item, index) => {
            if (item.type === '分组' && item.opened) {
                const subItem = item.children.map((ite, inde) => {
                    return <div style={{paddingLeft: '10px', width: '100%'}} id={ite.id}
                                key={ite.id}
                                onMouseOver={this.onHover.bind(this)}
                                onMouseOut={this.onMouseOut.bind(this)}><i
                        className={ite.icon}/> {ite.label}
                        <Dropdown trigger="click" onCommand={this.updateItem.bind(this, ite.id)} menu={(
                            <Dropdown.Menu>
                                <Dropdown.Item command="重命名">重命名</Dropdown.Item>
                                <Dropdown.Item command="移动到">移动到</Dropdown.Item>
                                <Dropdown.Item command="删除">删除</Dropdown.Item>
                            </Dropdown.Menu>
                        )} style={{position: "absolute", right: 0}}>
                          <span className="el-dropdown-link">
                            <i className="fas fa-bars"/>
                          </span>
                        </Dropdown>
                    </div>
                })
                return (
                    <div>
                        <div style={{width: '100%'}} id={item.id}
                             onClick={this.onOpened.bind(this, item.id)}
                             onMouseOver={this.onHover.bind(this)}
                             onMouseOut={this.onMouseOut.bind(this)}
                        >
                            <i className={item.opened ? item.icon : "fas fa-caret-right"}/> {item.label}
                            <Dropdown trigger="click" onCommand={this.updateItem.bind(this, item.id)} menu={(
                                <Dropdown.Menu>
                                    <Dropdown.Item>业务包</Dropdown.Item>
                                    <Dropdown.Item>分组</Dropdown.Item>
                                </Dropdown.Menu>
                            )} style={{position: "absolute", right: 20}}>
                          <span className="el-dropdown-link">
                            <i className="fas fa-plus"/>
                          </span>
                            </Dropdown>

                            <Dropdown trigger="click" onCommand={this.updateItem.bind(this, item.id)} menu={(
                                <Dropdown.Menu>
                                    <Dropdown.Item command="重命名">重命名</Dropdown.Item>
                                    <Dropdown.Item command="移动到">移动到</Dropdown.Item>
                                    <Dropdown.Item command="删除">删除</Dropdown.Item>
                                </Dropdown.Menu>
                            )} style={{position: "absolute", right: 0}}>
                          <span className="el-dropdown-link">
                            <i className="fas fa-bars"/>
                          </span>
                            </Dropdown>
                        </div>
                        {subItem}
                    </div>
                );
            } else if (item.type === '业务包') {
                return <div style={{width: '100%'}} id={item.id} key={item.id}
                            onClick={this.onOpened.bind(this, item.id)}
                            onMouseOver={this.onHover.bind(this)}
                            onMouseOut={this.onMouseOut.bind(this)}><i
                    className={item.icon}/> {item.label}
                    <Dropdown trigger="click" onCommand={this.updateItem.bind(this, item.id)} menu={(
                        <Dropdown.Menu>
                            <Dropdown.Item command="重命名">重命名</Dropdown.Item>
                            <Dropdown.Item command="移动到">移动到</Dropdown.Item>
                            <Dropdown.Item command="删除">删除</Dropdown.Item>
                        </Dropdown.Menu>
                    )} style={{position: "absolute", right: 0}}>
                          <span className="el-dropdown-link">
                            <i className="fas fa-bars"/>
                          </span>
                    </Dropdown>
                </div>
            } else {
                return (<div style={{width: '100%'}} id={item.id} key={item.id}
                             onClick={this.onOpened.bind(this, item.id)}
                             onMouseOver={this.onHover.bind(this)}
                             onMouseOut={this.onMouseOut.bind(this)}><i
                    className={item.opened ? item.icon : "fas fa-caret-right"}/> {item.label}
                    <Dropdown trigger="click" onCommand={this.updateItem.bind(this, item.id)} menu={(
                        <Dropdown.Menu>
                            <Dropdown.Item>业务包</Dropdown.Item>
                            <Dropdown.Item>分组</Dropdown.Item>
                        </Dropdown.Menu>
                    )} style={{position: "absolute", right: 20}}>
                          <span className="el-dropdown-link">
                            <i className="fas fa-plus"/>
                          </span>
                    </Dropdown>
                    <Dropdown trigger="click" onCommand={this.updateItem.bind(this, item.id)} menu={(
                        <Dropdown.Menu>
                            <Dropdown.Item command="重命名">重命名</Dropdown.Item>
                            <Dropdown.Item command="移动到">移动到</Dropdown.Item>
                            <Dropdown.Item command="删除">删除</Dropdown.Item>
                        </Dropdown.Menu>
                    )} style={{position: "absolute", right: 0}}>
                          <span className="el-dropdown-link">
                            <i className="fas fa-bars"/>
                          </span>
                    </Dropdown>
                </div>);
            }
        });

        return (
            <div>
                <Layout.Row>
                    <Layout.Col span={12}><i className="fas fa-object-ungroup"
                    />
                        <Button plain={true} type="info"
                                style={{borderStyle: "unset", background: "unset"}}
                                onClick={this.addGroup.bind(this)}>添加分组</Button>
                    </Layout.Col>
                    <Layout.Col span={12}><i className="fas fa-folder"/>
                        <Button plain={true} style={{borderStyle: "unset", background: "unset"}}
                                onClick={this.addBusiness.bind(this)}
                                type="info">添加业务包</Button>
                    </Layout.Col>
                </Layout.Row>
                <Layout.Row style={{height: '75vh'}}>
                    <Input style={{margin: "10px 0px 10px 0px"}} placeholder="搜索业务包和表" icon="search"/>
                    {treeList}
                </Layout.Row>
            </div>
        )


    }

}

export default BusinessList;