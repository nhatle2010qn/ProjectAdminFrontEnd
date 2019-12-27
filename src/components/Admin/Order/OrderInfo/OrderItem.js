import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OrderItem extends Component {
    componentDidMount(){
        
    }
    render() {
        const { orderDetail } = this.props;
        return (
            <tr key={orderDetail.productId}>
                <td>{orderDetail.productName}</td>
                <td>{orderDetail.quantity}</td>
            </tr>
        );
    }
}


OrderItem.protoTypes = {
    order: PropTypes.object.isRequired
}

export default OrderItem;