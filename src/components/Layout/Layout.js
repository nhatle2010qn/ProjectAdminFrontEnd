import React, { Component } from 'react';
import Sidebar from '../Admin/Sidebar/Sidebar';
import Header from '../Admin/Header_Footer/Header';
import Footer from '../Admin/Header_Footer/Footer';
import {withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
    }

    componentDidMount() {
        toast.success('hello');
        if(this.props.location.pathname == '/Login'){
            this.setState({
                show: false
            })
        }
        else{
            this.setState({
                show: true
            })
        }
        
    }

    componentWillReceiveProps(props) {
        if(props.location.pathname == '/Login'){
            this.setState({
                show: false
            })
        }
        else{
            this.setState({
                show: true
            })
        }
    }

    render() {
        const { show } = this.state;
        return (
            <div>
                {
                    show ? <div id="wrapper">
                        <Sidebar />
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <Header currentUser = {this.props.currentUser} />
                                <div className="container-fluid">
                                    {this.props.children}
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                        : <div> {this.props.children}</div>
                }

            </div>

        )
    }
}

export default withRouter(Layout);