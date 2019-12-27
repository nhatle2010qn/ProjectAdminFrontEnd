import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import List from './ListProduct';
import { connect } from 'react-redux';
import { getProductData } from '../../../../actions/productAction';
import {getBrandData} from '../../../../actions/brandAction';
import {getCategotyData} from '../../../../actions/categoryAction';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 4,
            pageRangeDisplay: 5,
            activePage: 1,
            itemsCount: 0,
            productList: [],
            category: [],
            brand : []
        }
    }
    componentDidMount = async () => {
        const { pageSize, activePage } = this.state;      
        await this.props.dispatch(getProductData(activePage, pageSize, ""));
        await this.props.dispatch(getBrandData());
        await this.props.dispatch(getCategotyData());
        const { category, brand} = this.props;
        console.log(this.props);
        this.setState({
            itemsCount: this.props.product.productLength,
            productList: this.props.product.productList,
            category,
            brand
        })
    }

    componentWillReceiveProps(props){
        const { category, brand} = props;
        this.setState({
            productList: props.product.productList,
            category,
            brand
        })
    }

    render() {
        var { productList, itemsCount, pageSize, pageRangeDisplay, activePage,category, brand} = this.state;
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <div className="row">
                        <h6 className="m-0 font-weight-bold text-primary col-6">Product</h6>
                        <div className="col-6">
                            <Link to="productAddUpdate" className="btn btn-success" style={{ float: "right" }}><i className="fas fa-plus"></i></Link>
                            <Link to="productList" className="btn btn-info" style={{ marginRight: "10px", float: "right" }}><i className="fas fa-list-alt"></i></Link>
                        </div>
                    </div>
                </div>
                {
                    productList.length > 0 ? <List
                    pageSize = {pageSize}
                    pageRangeDisplay = {pageRangeDisplay}
                    activePage = {activePage}
                    productList = {productList}
                    itemCount = {itemsCount}
                    category = {category}
                    brand = {brand}
                    /> : <div>No items </div>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        product: state.product.data,
        category : state.category.data,
        brand : state.brand.data
    }
}

export default connect(mapStateToProps)(ProductList);