import React, {PureComponent} from 'react';
import '../../adminLTEStyle/adminlte.css';
import '../../adminLTEStyle/fontawesome-free/css/all.min.css'

import {postRequest} from "../../utils/api";
import AlertUtil from "../../utils/AlertUtil";

class Login extends PureComponent {

    render() {
        return (
            <div className="login-page">
                <div className="login-box">
                    <div className="card">
                        <div className=" card-body login-card-body">
                            <p className="login-box-msg">小蜜蜂商业智能</p>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="请输入账号..."/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="请输入密码..."/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <button className="btn btn-primary btn-block" onClick={this.login}>登录</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    login() {
        postRequest("/login", {"password": "123456", "username": "guofan"});
        AlertUtil.show("登录成功","")
    }
}

export default Login;