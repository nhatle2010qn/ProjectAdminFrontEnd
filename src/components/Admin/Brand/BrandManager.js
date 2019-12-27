import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BrandManager extends Component {
    render() {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <div className="row">
                        <h6 className="m-0 font-weight-bold text-primary col-6">Brand</h6>
                        <div className="col-6">
                            <Link to="brandAddUpdate" className="btn btn-success" style={{ float: "right" }}><i className="fas fa-plus"></i></Link>
                            <Link to="brandList" className="btn btn-info" style={{ marginRight: "10px", float: "right" }}><i className="fas fa-list-alt"></i></Link>
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default BrandManager;