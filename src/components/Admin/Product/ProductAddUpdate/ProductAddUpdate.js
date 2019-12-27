import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductById, postProductData } from '../../../../actions/productAction';
import { getCategotyData } from '../../../../actions/categoryAction';
import { withRouter, Link } from 'react-router-dom';
import Dropzone, {}from 'react-dropzone';
import axios from '../../../../axios/axios';
import { getBrandData } from '../../../../actions/brandAction';

class ProductAddUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            txtName: '',
            txtDescription: '',
            txtPrice: '',
            txtImage: '',
            sltCategory: 0,
            sltBrand: 0,
            files: []
        };
    }
    componentWillMount = async () => {
        const s = window.location.search.substr(4);
        if (typeof s !== "undefined") {
            await this.props.dispatch(getProductById(s));
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
        
    }

    onSubmit = async (event) => {
        event.preventDefault();
        var { id, txtName, txtDescription, txtPrice, txtImage, sltCategory, sltBrand } = this.state;
        const product = {
            id: id,
            name: txtName,
            description: txtDescription,
            price: txtPrice,
            mainUrl: txtImage,
            categoryId: sltCategory,
            brandId : sltBrand
        };
        await this.props.dispatch(postProductData(product));
        this.props.history.push('/admin/product/productList')
    }

    componentWillReceiveProps(nextProps) {
        const { id, name, description, price, mainUrl, categoryId, brandId} = nextProps.data;
        if (id !== 0) {
            this.setState({
                id: id,
                txtName: name,
                txtDescription: description,
                txtPrice: price,
                txtImage: mainUrl,
                sltCategory: categoryId,
                sltBrand: brandId
            })
        }
    }
    onDrop = (acceptedFiles) => {
        if (acceptedFiles.length !== 0) {
            let formData = new FormData();
            formData.append("files", acceptedFiles[0], acceptedFiles[0].name);
            this.setState({
                txtImage : acceptedFiles[0].name
            })
            axios.post('/api/upload/UploadImage',formData);
        }
    }
    componentDidMount = async () => {
        await this.props.dispatch(getCategotyData());
        await this.props.dispatch(getBrandData());
    }

    render() {
        let slt,sltBr = [];
        if (this.props.category.length > 0) {
            slt = this.props.category.map((data) => {
                return (
                    <option value={data.id} key={data.id}>{data.name}</option>
                )
            })
        }
        if (this.props.brand.length > 0) {
            sltBr = this.props.brand.map((data) => {
                return (
                    <option value={data.id} key={data.id}>{data.name}</option>
                )
            })
        }
        const { txtName, txtDescription, txtPrice, sltCategory, txtImage, sltBrand } = this.state;
        const dropCss = {
            border: "2px dashed #0087F7",
            borderRadius: "5px",
            background: "white",
            padding: "54px 54px"

        }

        const previewStyle = {
            display: 'inline',
            width: 100,
            height: 100,
          };
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
                <div className="card-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product Name: </label>
                        <input className="form-control" onChange={this.onChange} value={txtName || ''} name="txtName" />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input className="form-control" onChange={this.onChange} value={txtDescription || ''} name="txtDescription" />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input className="form-control" onChange={this.onChange} value={txtPrice || ''} name="txtPrice" />
                    </div>
                    <div className="form-group">
                        <label>Image: </label>
                        <Dropzone onDrop={this.onDrop} accept="image/*">
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps({
                                        style: dropCss
                                    })}>
                                        <input {...getInputProps()} />
                                        <p style={{ textAlign: "center" }}>Drag 'n' drop some files here, or click to select files</p>
                                        
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        <p>File: {txtImage}</p>

                    </div>
                    <div className="form-group" >
                        <label>Category: </label>
                        <select className="form-control" onChange={this.onChange} value={sltCategory} name="sltCategory">
                            <option value="" defaultValue>Choose Category</option>
                            {slt}
                        </select>
                    </div>
                    <div className="form-group" >
                        <label>Brand: </label>
                        <select className="form-control" onChange={this.onChange} value={sltBrand} name="sltBrand">
                            <option value="" defaultValue>Choose Brand</option>
                            {sltBr}
                        </select>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <div className="p-2 bd-highlight"><button className="btn btn-success" value="Submit">Submit</button></div>
                        <div className="p-2 bd-highlight"><button className="btn btn-secondary">Reset</button></div>
                    </div>

                </form>
            </div>
            </div>
            
        );
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.product.dataById,
        category: state.category.data,
        brand: state.brand.data
    }

}


export default connect(mapStateToProps)(withRouter(ProductAddUpdate));
