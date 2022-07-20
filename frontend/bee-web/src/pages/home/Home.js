import React, {useState, useEffect} from 'react';
import bee from '../../static/img/bee.png'
import {Outlet, Link, useNavigate} from 'react-router-dom'
import {Dropdown} from 'element-react'

function Home() {
    const [menuOpen, setMenuOpen] = useState(true);
    const onOpenMenu = () => {
        console.log("点击了按钮");
        setMenuOpen(!menuOpen);
    }
    const onLogout = (item) => {
        if(item==="logout"){
            window.sessionStorage.removeItem('tokenStr');
            navigate("/login")
        }
    }
    let navigate = useNavigate();
    useEffect(() => {
        //判断是否登录
        if (window.sessionStorage.getItem('tokenStr')) {
            console.log("已登录！");
            return;
        }
        console.log("未登录跳转到登录界面");
        navigate("/login")
    })

    return (
        //   hold-transition sidebar-mini sidebar-collapse 关闭的css
        <div className={menuOpen ? "sidebar-mini " : " sidebar-mini sidebar-collapse"}>
            {/*导航栏*/}
            <div className="wrapper">
                {/*导航栏*/}
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    {/*左边导航栏*/}
                    <ul className="navbar-nav">
                        <li className="nav-item" onClick={onOpenMenu}>
                            <div className="nav-link"><i
                                className="fas fa-bars"></i></div>
                        </li>
                    </ul>
                    {/*右边导航栏*/}
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <div className="nav-link">
                                <i className="fas fa-search"></i>
                            </div>
                            <div className="navbar-search-block">

                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="nav-link">
                                <i className="far fa-comments"></i>
                                <span className="badge badge-danger navbar-badge">3</span>
                            </div>
                        </li>

                        <li className="nav-item dropdown">
                            <div className="nav-link">
                                <Dropdown menu={(
                                    <Dropdown.Menu>
                                        <Dropdown.Item command="details">详情</Dropdown.Item>
                                        <Dropdown.Item command="logout">退出</Dropdown.Item>
                                    </Dropdown.Menu>
                                )}
                                          onCommand={onLogout}>
                                  <span className="el-dropdown-link">
                                    <i className="far fa-user-circle"></i>
                                  </span>
                                </Dropdown>
                            </div>
                        </li>
                    </ul>
                </nav>
                {/*菜单*/}
                <aside className="main-sidebar sidebar-dark-primary elevation-3">
                    <div className="brand-link">
                        <img src={bee} alt="AdminLTE Logo" className="brand-image img-circle elevation-3"
                             style={{opacity: .8}}/>
                        <span className="brand-text font-weight-light">AdminLTE 3</span>
                    </div>
                    <div className="sidebar">
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column">
                                <li className="nav-item">
                                    <div className="nav-link">
                                        <span className="fas fa-database" style={{margin: "5px"}}></span>
                                        <p>
                                            <Link to="/dataImport">数据导入</Link>
                                        </p>
                                    </div>

                                </li>
                                <li className="nav-item">
                                    <div className="nav-link">
                                        <span className="fas fa-user-circle" style={{margin: "5px"}}></span>
                                        <p>
                                            <Link to="/prem">权限管理</Link>
                                        </p>
                                    </div>

                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
                {/*主显示区域*/}
                <div className="content-wrapper">
                    <Outlet></Outlet>
                </div>
                {/*最下边*/}
                <div className="main-footer">
                    <div class="float-right d-none d-sm-block">
                        <b>Version</b> 3.2.0
                    </div>
                    <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">Bee.io</a>.</strong> All rights
                    reserved.
                </div>
            </div>
        </div>
    );
}

export default Home;