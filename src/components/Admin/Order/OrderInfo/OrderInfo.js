import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../../utils/Pagination/Pagination';
import { dataPagination } from '../../../utils/Pagination/dataPagination';
import { withRouter } from 'react-router-dom';
import { getOrderDetailData } from '../../../../actions/orderAction';
import OrderList from './OrderList';

class OrderInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            pageSize: 5,
            pageRangeDisplay: 5,
            itemCount: 0,
            orderDetail: []
        }
    }

    componentDidMount = async () =>{
        var id = this.props.location.state.id;
        await this.props.dispatch(getOrderDetailData(id));
        this.setState({
            orderDetail : this.props.order.dataById
        });
    }
    loadData = () => {
        var countData = this.props.order.dataById.length;
        var data = [];
        data = dataPagination(this.props.order.dataById, this.state.activePage, this.state.pageSize);
        this.setState({
            orderDetail: data,
            itemCount: countData
        });
    }

    render() {
        const { activePage, pageSize, itemCount, pageRangeDisplay, orderDetail } = this.state;
        return (
            <div className="card-body">
                <div className="table-responsive">
                    <OrderList
                        orderDetail = {orderDetail}
                    />
                </div>
                {/* <div className="text-center">
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={pageSize}
                        totalItemsCount={itemCount}
                        pageRangeDisplayed={pageRangeDisplay}
                        onChange={this.handlePageChange}
                    />
                </div> */}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        order : state.order
    }
}

export default connect(mapStateToProps)(withRouter(OrderInfo));