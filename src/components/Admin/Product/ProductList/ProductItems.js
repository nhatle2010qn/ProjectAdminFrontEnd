import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ProductItem extends Component {

    handleUpdate = (id) => {
        this.props.history.push('/admin/product/productAddUpdate?id=' + id)
    }

    handleDelete = (id) => {
        console.log('hello')
    }

    componentDidMount() {
        this.loadCategory();
        this.loadBrand();
    }

    loadCategory = () => {
        if(this.props.category.length > 0 ){
            for (var i = 0; i < this.props.category.length; i++) {
                if (this.props.category[i].id == this.props.dataP.categoryId) {
                    return this.props.category[i].name
                }
            }
        }
        else{
            return '';
        }
       
    }
    
    loadBrand = () =>{
        if( this.props.brand.length > 0){
            for (var i = 0; i < this.props.brand.length; i++) {
                if (this.props.brand[i].id == this.props.dataP.brandId) {
                    return this.props.brand[i].name
                }
            }
        }
        else{
            return '';
        }
       
    }

    render() {
        const { dataP } = this.props;
        const categoryName = this.loadCategory();
        const brandName = this.loadBrand();
        return (
            <tr key={dataP.id}>
                <td>{dataP.name}</td>
                <td>{dataP.description}</td>
                <td>{dataP.price}</td>
                <td><img style={{ width: 100 }} src={"http://localhost:44322/wwwroot/Image/Products/" + dataP.mainUrl} /></td>
                <td>{categoryName}</td>
                <td>{brandName}</td>
                <td>
                    <button className="btn btn-success btn-sm" onClick={() => this.handleUpdate(dataP.id)}><i className="fa fa-pen"></i></button>
                </td>
                <td>
                    <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(dataP.id)}><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        );
    }
}


ProductItem.protoTypes = {
    product: PropTypes.object.isRequired
}

export default connect()(withRouter(ProductItem));