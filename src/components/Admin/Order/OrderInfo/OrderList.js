import React, { Component } from 'react';
import OrderItem from './OrderItem';

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetail: []
        }
    }

    componentDidMount() {
        this.setState({
            orderDetail: this.props.orderDetail
        })
    }
    componentWillReceiveProps(props) {
        this.setState({
            orderDetail: props.orderDetail
        }, () => console.log(this.state.orderDetail))

    }
    render() {
        var { orderDetail } = this.state;
        return (
            <div>
                {
                    orderDetail.length > 0 ? (
                        <table className="table " id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th scope='col'>ProductId</th>
                                    <th scope='col'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>{
                                orderDetail.map(order => (
                                    <OrderItem
                                        key={order.productId}
                                        orderDetail={order}
                                    />
                                ))
                            }

                            </tbody>
                        </table>) : <div>No item</div>
                }
            </div>
        );
    }
}

export default OrderList;