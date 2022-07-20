import React, { createRef} from 'react';
import {postRequest} from "../../utils/api";
import AlertUtil from "../../utils/AlertUtil";
import {useNavigate} from 'react-router-dom'

function Login() {
    const usernameRef = createRef();
    const passwordRef = createRef();
    let navigate = useNavigate()
    const login = () => {
        postRequest("/login", {
            "username": usernameRef.current.value,
            "password": passwordRef.current.value
        }).then(resp => {
            if (resp) {
                const tokenStr = resp.obj.tokenHead + resp.obj.token
                window.sessionStorage.setItem('tokenStr', tokenStr)
                // 跳转首页
                console.log('token是：' + tokenStr);
                AlertUtil.show("登录成功", "")
                navigate("/");
            } else {
                AlertUtil.error("登录失败", "")
                navigate("/login");
            }
        }).catch(error => {
            AlertUtil.error("登录异常", error)
            navigate("/login");
        });
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="card">
                    <div className=" card-body login-card-body">
                        <p className="login-box-msg">小蜜蜂商业智能</p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" ref={usernameRef}
                                   placeholder="请输入账号..."/>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" ref={passwordRef}
                                   placeholder="请输入密码..."/>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <button className="btn btn-primary btn-block" onClick={login}>登录</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;