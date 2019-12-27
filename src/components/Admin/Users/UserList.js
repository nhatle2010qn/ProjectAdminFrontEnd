import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../utils/Pagination/Pagination';
import { dataPagination } from '../../utils/Pagination/dataPagination';
import { withRouter } from 'react-router-dom';
import {getUserList} from '../../../actions/userAction';


class UserManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            pageSize: 5,
            pageRangeDisplay: 5,
            itemCount: 0
        }
    }

    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber }, () => {
            this.loadData();
        });

    }
    componentDidMount = async () => {
        await this.props.dispatch(getUserList());
        this.loadData();
    }

    loadData = () => {
        var countData = this.props.user.length;
        var data = [];
        data = dataPagination(this.props.user, this.state.activePage, this.state.pageSize);
        this.setState({
            dataPaging: data,
            itemCount: countData
        });
    }

    // handleUpdate = (id) => {
    //     this.props.history.push({pathName: '/admin/order/orderUpdate?id=' + id, state: {data: this.props.order.data}});
    // }

    // handleInfo = (id) => {
    //     this.props.history.push({pathname: '/admin/order/orderInfo',state: {id: id}});
    // }
    

    // handleDelete = (id) => {
    //     console.log('hello')
    // }
    render() {
        let dataPr = [];
        if (this.state.dataPaging && this.state.dataPaging.length > 0) {
            dataPr = this.state.dataPaging.map((dataP) => {
                return (
                    <tr key={dataP.id}>
                        <td>{dataP.email}</td>
                        <td>{dataP.role}</td>
                        <td>{dataP.phoneNumber}</td>
                        <td>{dataP.userName}</td>
                        <td>{dataP.name}</td>
                        {/* <td>
                            <button className="btn btn-info btn-sm" onClick={() => this.handleInfo(dataP.id)}><i className="fa fa-info"></i></button>
                        </td>
                        <td>
                            <button className="btn btn-success btn-sm" onClick={() => this.handleUpdate(dataP.id)}><i className="fa fa-pen"></i></button>
                        </td>
                        <td>
                            <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(dataP.id)}><i className="fa fa-trash"></i></button>
                        </td> */}
                    </tr>
                )
            })
        }
        const { activePage, pageSize, itemCount, pageRangeDisplay } = this.state;
        return (


            <div className="card-body">
                <div className="table-responsive">
                    <table className="table " id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th scope='col'>Email</th>
                                <th scope='col'>Role</th>
                                <th scope='col'>Phone Number</th>
                                <th scope='col'>User Name</th>
                                <th scope='col'>Name</th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            {dataPr}
                        </tbody>
                    </table>

                </div>
                <div className="text-center">
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={pageSize}
                        totalItemsCount={itemCount}
                        pageRangeDisplayed={pageRangeDisplay}
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user.listData
    }
}

export default connect(mapStateToProps)(withRouter(UserManager));