import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../../utils/Pagination/Pagination';
import { withRouter } from 'react-router-dom';
import ProductItem from './ProductItems';
import { getProductData } from '../../../../actions/productAction';

class ListProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            productList: [],
            brand: [],
            category: []
        }
    }
    handlePageChange = async (pageNumber) => {
        const {pageSize} = this.props;
        this.setState({ activePage: pageNumber });
        await this.props.dispatch(getProductData(pageNumber, pageSize, ""));
    }
    componentDidMount(){
        const {brand,productList,category} = this.props;
        this.setState({
            productList,
            brand,
            category
        })
    }
    componentWillReceiveProps(props){
        const { category, brand} = props;
        console.log(props);
        this.setState({
            productList : props.productList,
            category,
            brand
        })
    
    }
    render() {
        const {activePage, productList,category,brand} = this.state;
        const { itemCount, pageSize, pageRangeDisplay } = this.props;
        return (
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table " id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Desciription</th>
                                <th scope='col'>Price</th>
                                <th scope='col'>Image</th>
                                <th scope='col'>Category</th>
                                <th scope='col'>Brand</th>
                                <th scope='col'></th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productList.map(product => (
                                    <ProductItem
                                        category = {category}
                                        brand = {brand}
                                        key={product.id}
                                        dataP={product}
                                    />
                                ))
                            }
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

export default connect()(withRouter(ListProduct));