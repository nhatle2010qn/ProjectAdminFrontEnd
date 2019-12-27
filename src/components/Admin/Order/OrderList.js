import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../utils/Pagination/Pagination';
import { dataPagination } from '../../utils/Pagination/dataPagination';
import { withRouter } from 'react-router-dom';
import { getOrderData, updateOrder } from '../../../actions/orderAction';


class OrderManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            pageSize: 5,
            pageRangeDisplay: 5,
            itemCount: 0,
            show: false
        }
    }

    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber }, () => {
            this.loadData();
        });

    }
    componentDidMount = async () => {
        await this.props.dispatch(getOrderData());
        this.loadData();
    }

    componentWillReceiveProps(props){

    }

    loadData = () => {
        var countData = this.props.order.data.length;
        var data = [];
        data = dataPagination(this.props.order.data, this.state.activePage, this.state.pageSize);
        this.setState({
            dataPaging: data,
            itemCount: countData
        });
    }

    handleUpdate = (id) => {
        this.props.history.push({ pathName: '/admin/order/orderUpdate?id=' + id, state: { data: this.props.order.data } });
    }

    handleInfo = (id) => {
        this.props.history.push({ pathname: '/admin/order/orderInfo', state: { id: id } });
    }


    handleDelete = (id) => {
        console.log('hello')
    }

    onChangeSelect = async (dataP, ev) =>{
        const vm = {
            Id : dataP.id,
            CouponId : dataP.couponId,
            OrderDate : dataP.orderDate,
            Total : dataP.total,
            UserId : dataP.userId,
            UserName : dataP.userName,
            Status :  ev.target.value
        }

        await this.props.dispatch(updateOrder(vm));
        await this.props.dispatch(getOrderData());
        this.loadData();
    }
    render() {
        let dataPr = [];
        if (this.state.dataPaging && this.state.dataPaging.length > 0) {
            dataPr = this.state.dataPaging.map((dataP) => {
                return (
                    <tr key={dataP.id}>
                        <td>{dataP.orderDate}</td>
                        <td>{dataP.total}</td>
                        <td>{dataP.userName}</td>
                        <td><select onChange={(e) => this.onChangeSelect(dataP, e)} value={dataP.status}> <option value="Waiting">Waiting</option>
                            <option value="Done">Done</option>
                            <option value="Cancelled">Cancel</option></select></td>
                        <td>
                            <button className="btn btn-info btn-sm" onClick={() => this.handleInfo(dataP.id)}><i className="fa fa-info"></i></button>
                        </td>
                       
                        
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

                                <th scope='col'>OrderDate</th>
                                <th scope='col'>Total</th>
                                <th scope='col'>UserId</th>
                                <th scope='col'>Status</th>
                                <th scope='col'></th>
                                <th scope='col'></th>
                                <th scope='col'></th>
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
        order: state.order
    }
}

export default connect(mapStateToProps)(withRouter(OrderManager));