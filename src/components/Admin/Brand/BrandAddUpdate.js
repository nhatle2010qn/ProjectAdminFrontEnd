import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { getBrandById, postBrandData } from '../../../actions/brandAction';

class BrandAddUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            txtName: '',
            sltParent: 0
        };
    }
    componentWillMount = async () => {
        const s = window.location.search.substr(4);
        if (typeof s !== "undefined") {
            await this.props.dispatch(getBrandById(s));
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    onSubmit = async (event) => {
        event.preventDefault();
        var {id, txtName } = this.state;
        const brand = {
            id: id,
            name: txtName,
        };
        await this.props.dispatch(postBrandData(brand));
        if(id !== 0){
            this.props.history.push('/admin/brand/brandList');
        }else{
            var rs = window.confirm("Do you want add brand again?")
            if(rs){
                this.setState({
                    id: 0,
                    txtName: '',
                });
            }
            else{
                this.props.history.push('/admin/brand/brandList');
            }
        }
    }
    componentWillReceiveProps(nextProps){
        const {id, name} = nextProps.dataById;
        if(id !== 0){
            this.setState({
                id : id,
                txtName : name,
            })
        }
    }

    render() {
        const { txtName } = this.state;
        return (
            <div className="card-body">
                <form id="myForm">
                    <div className="form-group">
                        <label>Brand Name: </label>
                        <input className="form-control" onChange={this.onChange} value={txtName || ''} name="txtName" />
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <div className="p-2 bd-highlight"><button className="btn btn-success" value="Submit" onClick={this.onSubmit}>Submit</button></div>
                        <div className="p-2 bd-highlight"><button className="btn btn-secondary" onClick={this.onReset}>Reset</button></div>
                    </div>

                </form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        dataById: state.brand.dataById,
        data : state.brand.data
    }

}


export default connect(mapStateToProps)(withRouter(BrandAddUpdate));
