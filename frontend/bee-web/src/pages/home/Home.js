import React from 'react';
import '../../adminLTEStyle/adminlte.css';
import '../../adminLTEStyle/fontawesome-free/css/all.min.css'
// import {postRequest} from "../../utils/api";
// import AlertUtil from "../../utils/AlertUtil";
// import {useNavigate} from 'react-router-dom'
import AdminLTELogo from '../../static/img/AdminLTELogo.png'

function Home() {

    return (
        //   hold-transition sidebar-mini sidebar-collapse 关闭的css
        <div className="  sidebar-mini sidebar-open">
            {/*导航栏*/}
            <div className="wrapper">
                {/*导航栏*/}
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    {/*左边导航栏*/}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <div className="nav-link"><i
                                className="fas fa-bars"></i></div>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <div className="nav-link">Home</div>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <div href="#" className="nav-link">Contact</div>
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

                    </ul>
                </nav>
                {/*主菜单*/}
                <aside className="main-sidebar sidebar-dark-primary elevation-4">

                    <div className="brand-link">
                        <img src={AdminLTELogo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3"
                             style={{opacity: .8}}/>
                        <span className="brand-text font-weight-light">AdminLTE 3</span>
                    </div>
                    <div className="sidebar">
                        <nav className="mt-2">
                            <ul>
                                <li className="nav-item" style={{color: "white" ,height: 40,margin: 10,padding :10}}>
                                        数据导入
                                </li>
                                <li className="nav-item" style={{color: "white" ,height: 40,margin: 10,padding :10}}>
                                        权限设置
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
                {/*主显示区域*/}
                <div className="content-wrapper">
                    <section className="content-header">内容上面</section>
                    <section className="content">内容中间</section>
                </div>
                {/*最下边*/}
                <div className="main-footer"> <div class="float-right d-none d-sm-block">
                    <b>Version</b> 3.2.0
                </div>
                    <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">Bee.io</a>.</strong> All rights reserved.</div>
            </div>
        </div>
    );
}

export default Home;