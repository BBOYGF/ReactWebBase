import React, {Component} from "react";
import {Input, Button, Layout, Dropdown, Dialog, Radio} from 'element-react'
import {Link} from "react-router-dom";


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
                change: false,
                children: [{
                    id: 5,
                    icon: 'fas fa-address-book',
                    label: '分享给我的自助数据集',
                    change: false,
                }, {
                    id: 6,
                    icon: 'fas fa-address-book',
                    label: '***的业务包',
                    change: false
                }]
            }, {
                id: 2,
                label: '分组',
                type: '分组',
                icon: 'fas fa-sort-down',
                opened: true,
                change: false,
                children: [{
                    id: 7,
                    icon: 'fas fa-folder-open',
                    change: false,
                    label: '业务包2'
                }, {
                    id: 8,
                    icon: 'fas fa-folder-open',
                    change: false,
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
                    change: false,
                    label: '业务包1'
                }]
            },
                {
                    id: 4,
                    label: '业务包',
                    icon: 'fas fa-folder-open',
                    change: false,
                    opened: true,
                    type: '业务包',
                    children: []
                }
            ],
            dialogVisible: false,
            moveBusinessPackage: {},
            targetPackage: 0
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

    updateItem(id, command, item, e) {
        console.log("command:" + command);
        console.log("id：" + id);
        console.log(e);
        const data = this.state.data;
        if (command === '重命名') {
            console.log(item)
            const selectItemList = data.filter(item => {
                return item.id === id
            });
            // 判断是否有父组件
            const selectItem = selectItemList[0];
            if (selectItem) {
                console.log("修改父组件逻辑")
                selectItem.change = true;
            } else {
                // 修改子组件逻辑
                console.log("修改子组件逻辑")
                for (let i = 0; i < data.length; i++) {
                    const datum = data[i];
                    const selectedChildren = datum.children.filter(item => {
                        return item.id === id
                    });
                    if (selectedChildren.length > 0) {
                        console.log("找到子组件");
                        console.log(selectedChildren);
                        const filterElement = selectedChildren[0];
                        if (filterElement) {
                            console.log("修改子组件")
                            console.log(filterElement);
                            filterElement.change = true;
                        }
                    }
                }
            }
            this.setState({
                data: data
            })
            console.log("修改了id为" + id + "的是否可更改为true")
        } else if (command === '移动到') {
            for (let i = 0; i < data.length; i++) {
                const datum1 = data[i];
                if (datum1.id === id) {
                    console.log("找到id为" + id + "的业务包")
                    this.setState({
                        dialogVisible: true,
                        moveBusinessPackage: datum1
                    });
                } else {
                    const children1 = datum1.children;
                    if (children1.length > 0) {
                        console.log("children有值")
                        for (let j = 0; j < children1.length; j++) {
                            const children1Element = children1[j];
                            if (children1Element.id === id) {
                                console.log("找到id为" + id + "的业务包")
                                this.setState({
                                    dialogVisible: true,
                                    moveBusinessPackage: children1Element
                                });
                                return;
                            }
                        }
                    }
                }
            }

        } else if (command === "删除") {
            console.log("删除分组")
            console.log(data)
            const newData = data.filter(item => {
                return item.id !== id
            });
            console.log("删除业务包")
            for (let i = 0; i < newData.length; i++) {
                const newDatum = newData[i];
                const children = newDatum.children;
                if (children) {
                    newDatum.children = children.filter(ite => {
                        return ite.id !== id
                    })
                }
            }
            this.setState({
                data: newData
            })
            console.log("删除数据" + newData)
        }
        console.log("执行完成")

    }

    //  增加业务包

    addBusinessPackage(parentId) {
        const data = this.state.data;
        const selectItem = data.filter(item => {
            return item.id === parentId
        });
        console.log("添加业务包" + parentId)
        console.log(selectItem)
        if (selectItem) {
            selectItem[0].children.push({
                id: '',
                icon: 'fas fa-folder-open',
                label: '业务包2'
            });
        }
        this.setState({
            data: data
        })
    }

    handleClick(e) {
        e.stopPropagation();
    }

    onUpdateName(e, id) {
        const data = this.state.data;
        const selectItemList = data.filter(item => {
            return item.id === id
        });
        const selectItem = selectItemList[0];
        if (selectItem) {
            console.log("修改父组件名称");
            selectItem.label = e.target.value;
            selectItem.change = false;
        } else {
            console.log("修改父组件名称")
            for (let i = 0; i < data.length; i++) {
                const datum = data[i];
                const selectedChildren = datum.children.filter(item => {
                    return item.id === id
                });
                if (selectedChildren.length > 0) {
                    console.log("找到子组件");
                    console.log(selectedChildren);
                    const filterElement = selectedChildren[0];
                    if (filterElement) {
                        console.log("修改子组件")
                        console.log(filterElement);
                        filterElement.change = false;
                        filterElement.label = e.target.value;
                    }
                }
            }
        }
        this.setState({
            data: data
        })
    }

    moveBusPackage() {
        console.log("移动业务包")
        const data = this.state.data;
        const moveId = this.state.moveBusinessPackage.id;
        const targetId = this.state.targetPackage;
        const filter = data.filter((item) => {
            return item.id !== moveId;
        });
        console.log("去掉父组件的业务包")
        for (let i = 0; i < filter.length; i++) {
            const filterElement = filter[i];
            const children = filterElement.children;
            const newChildren = children.filter((item) => {
                return item.id !== moveId;
            });
            filterElement.children = newChildren;
        }
        console.log("去掉子件的业务包")
        const target = filter.filter((item) => {
            return item.id === targetId;
        });
        target[0].children.push(this.state.moveBusinessPackage);
        console.log("添加业务包")
        this.setState({
            data: filter,
            dialogVisible: false
        })
    }

    render() {
        const {data} = this.state
        const treeList = data.map((item, index) => {
            if (item.type === '分组' && item.opened) {
                const subItem = item.children.map((ite, inde) => {
                    return <div style={{paddingLeft: '10px', width: '100%'}} id={ite.id}
                                key={ite.id}
                                onMouseOver={this.onHover.bind(this)}
                                onMouseOut={this.onMouseOut.bind(this)}>
                        <Link to={"/dataImport/" + ite.id}>
                            <i
                                className={ite.icon}/>
                            <input defaultValue={ite.label} style={{width: '90%', borderStyle: 'none'}}
                                   disabled={!ite.change}
                                   onClick={(e) => {
                                       this.handleClick(e)
                                   }} onBlur={(e) => this.onUpdateName(e, ite.id)}
                            >
                            </input>

                        </Link>
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
                        <Layout.Row>
                            <Layout.Col span={20}>
                                <div style={{width: '100%'}} id={item.id}
                                     onClick={this.onOpened.bind(this, item.id)}
                                     onMouseOver={this.onHover.bind(this)}
                                     onMouseOut={this.onMouseOut.bind(this)}
                                >
                                    <i className={item.opened ? item.icon : "fas fa-caret-right"}/>

                                    <input defaultValue={item.label} style={{width: '90%', borderStyle: 'none'}}
                                           disabled={!item.change}
                                           onClick={(e) => {
                                               this.handleClick(e)
                                           }} onBlur={(e) => this.onUpdateName(e, item.id)}
                                    >
                                    </input>

                                </div>
                            </Layout.Col>
                            <Layout.Col span={4}>
                                <div>
                                    <Dropdown trigger="click" onCommand={this.addBusinessPackage.bind(this, item.id)}
                                              menu={(
                                                  <Dropdown.Menu>
                                                      <Dropdown.Item>业务包</Dropdown.Item>
                                                  </Dropdown.Menu>
                                              )} style={{position: "absolute", right: 20}}>
                          <span className="el-dropdown-link">
                            <i className="fas fa-plus"/>
                          </span>
                                    </Dropdown>

                                    <Dropdown trigger="click" onCommand={this.updateItem.bind(this, item.id)}
                                              menu={(
                                                  <Dropdown.Menu>
                                                      <Dropdown.Item command="重命名">重命名</Dropdown.Item>
                                                      <Dropdown.Item command="删除">删除</Dropdown.Item>
                                                  </Dropdown.Menu>
                                              )} style={{position: "absolute", right: 0}}>
                          <span className="el-dropdown-link">
                            <i className="fas fa-bars"/>
                          </span>
                                    </Dropdown>
                                </div>
                            </Layout.Col>
                        </Layout.Row>
                        {subItem}
                    </div>
                );
            } else if (item.type === '业务包') {
                return <div style={{width: '100%'}} id={item.id} key={item.id}
                            onClick={this.onOpened.bind(this, item.id)}
                            onMouseOver={this.onHover.bind(this)}
                            onMouseOut={this.onMouseOut.bind(this)}>
                    <Link to={"/dataImport/" + item.id}>
                        <i
                            className={item.icon}/>
                        <input defaultValue={item.label} style={{width: '90%', borderStyle: 'none'}}
                               disabled={!item.change}
                               onBlur={(e) => this.onUpdateName(e, item.id)}
                        >
                        </input>
                    </Link>
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
                return (
                    <Layout.Row>
                        <Layout.Col span={20}>
                            <div style={{width: '100%'}} id={item.id} key={item.id}
                                 onClick={this.onOpened.bind(this, item.id)}
                                 onMouseOver={this.onHover.bind(this)}
                                 onMouseOut={this.onMouseOut.bind(this)}><i
                                className={item.opened ? item.icon : "fas fa-caret-right"}/>
                                <input defaultValue={item.label} style={{width: '90%', borderStyle: 'none'}}
                                       disabled={!item.change}
                                       onBlur={(e) => this.onUpdateName(e, item.id)} autoFocus={true}
                                       onClick={(e) => {
                                           this.handleClick(e)
                                       }}
                                />
                            </div>
                        </Layout.Col>
                        <Layout.Col span={4}>
                            <div>
                                <Dropdown trigger="click" onCommand={this.addBusinessPackage.bind(this, item.id)}
                                          menu={(
                                              <Dropdown.Menu>
                                                  <Dropdown.Item>业务包</Dropdown.Item>
                                              </Dropdown.Menu>
                                          )} style={{position: "absolute", right: 20}}>
                          <span className="el-dropdown-link">
                            <i className="fas fa-plus"/>
                          </span>
                                </Dropdown>
                                <Dropdown trigger="click" onCommand={this.updateItem.bind(this, item.id)} menu={(
                                    <Dropdown.Menu>
                                        <Dropdown.Item command="重命名">重命名</Dropdown.Item>
                                        <Dropdown.Item command="删除">删除</Dropdown.Item>
                                    </Dropdown.Menu>
                                )} style={{position: "absolute", right: 0}}>
                          <span className="el-dropdown-link">
                            <i className="fas fa-bars"/>
                          </span>
                                </Dropdown>
                            </div>
                        </Layout.Col>
                    </Layout.Row>
                );
            }
        });
        // 渲染可选列表
        const moveListItem = data.map((item, index) => {
            if (item.type === '分组') {
                return (

                    <div>
                        <Radio value={item.id} checked={this.state.targetPackage === item.id}
                               onChange={() => (this.setState({targetPackage: item.id}))}>{item.label}</Radio>
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
                <div>
                    <Dialog
                        title={"将业务包”" + this.state.moveBusinessPackage.label + "“移动到"}
                        size="tiny"
                        visible={this.state.dialogVisible}
                        onCancel={() => this.setState({dialogVisible: false})}
                        lockScroll={false}
                    >
                        <Dialog.Body>
                            {moveListItem}
                        </Dialog.Body>
                        <Dialog.Footer className="dialog-footer">
                            <Button onClick={() => this.setState({dialogVisible: false})}>取消</Button>
                            <Button type="primary" onClick={this.moveBusPackage.bind(this)}>确定</Button>
                        </Dialog.Footer>
                    </Dialog>
                </div>
            </div>
        )
    }

}

export default BusinessList;