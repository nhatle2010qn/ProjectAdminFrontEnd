import React, { Component } from 'react';
import {login, getCurrentUser, logout} from '../../actions/accountAction';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (ev) =>{
        ev.preventDefault();
        const user = {
            userName : this.state.username,
            password : this.state.password,
            remember: this.state.remember
        }
        await this.props.dispatch(login(user));
        if(this.props.data){
            if(this.props.data.role == 'Admin'){
                this.props.history.push('/');
                await this.props.dispatch(getCurrentUser());
            }
            else{
                await this.props.dispatch(logout());        
                toast.error('Not authorize');
            } 
        }
    }
    render() {
        const {username, password} = this.state;
        return (
                <div className="row justify-content-center">     
                <ToastContainer />     
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6" style={{minHeight: '552px'}}>
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form className="user">
                                                
                                                <div className="form-group">
                                                    <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                                     onChange={this.onChange} placeholder="Enter Email Address..." value={username || ''} name="username" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user" id="exampleInputPassword" 
                                                    onChange={this.onChange} placeholder="Password" value={password || ''} name="password" />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" name="remember" />
                                                        <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary btn-user btn-block" onClick={this.handleSubmit}>Login</button>
                                               
                                                {/* <a href="index.html" className="btn btn-google btn-user btn-block">
                                                    <i className="fab fa-google fa-fw"></i> Login with Google
                                                </a>
                                                <a href="index.html" className="btn btn-facebook btn-user btn-block" >
                                                    <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                                </a> */}
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <a className="small" href="register.html">Create an Account!</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        data: state.user.data
    }
}
export default connect(mapStateToProps)(withRouter(LoginComponent));