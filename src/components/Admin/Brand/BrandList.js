import React, { Component } from 'react';
import Pagination from '../../utils/Pagination/Pagination';
import { dataPagination } from '../../utils/Pagination/dataPagination';
import { getBrandData, deleteBrandData } from '../../../actions/brandAction';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class BrandList extends Component {
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
        await this.props.dispatch(getBrandData());
        this.loadData();
    }

    loadData = () => {
        var countData = this.props.brand.data.length;
        var data = [];
        data = dataPagination(this.props.brand.data, this.state.activePage, this.state.pageSize);
        this.setState({
            dataPaging: data,
            itemCount: countData
        });
    }

    handleUpdate = (id) => {
        this.props.history.push('/admin/brand/brandAddUpdate?id=' + id)
    }

    handleDelete = (id) => {
        var rs = window.confirm('Do you want delete this brand?');
        if (rs) {
            this.props.dispatch(deleteBrandData(id));
        }
    }
    render() {
        let dataPr = [];
        if (this.state.dataPaging && this.state.dataPaging.length > 0) {
            dataPr = this.state.dataPaging.map((dataP) => {
                return (
                    <tr key={dataP.id}>
                        <td>{dataP.name}</td>
                        <td>
                            <button className="btn btn-success btn-sm" onClick={() => this.handleUpdate(dataP.id)}><i className="fa fa-pen"></i></button>
                        </td>
                        <td>
                            <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(dataP.id)}><i className="fa fa-trash"></i></button>
                        </td>
                    </tr>
                )
            })
        }
        const { activePage, pageSize, itemCount, pageRangeDisplay } = this.state;
        return (
            <div className="card-body">
                {itemCount > 0 ? (<div className="table-responsive">
                    <table className="table " id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'></th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPr}
                        </tbody>
                    </table>
                    <div className="text-center">
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={pageSize}
                            totalItemsCount={itemCount}
                            pageRangeDisplayed={pageRangeDisplay}
                            onChange={this.handlePageChange}
                        />
                    </div>
                </div>) : <div className="text-center">No data</div>}
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        brand: state.brand
    }
}
export default connect(mapStateToProps)(withRouter(BrandList));