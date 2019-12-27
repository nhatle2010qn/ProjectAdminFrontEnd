import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getCategoryById,postCategoryData, getCategotyData} from '../../../actions/categoryAction';

class CategoryAddUpdate extends Component {
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
            await this.props.dispatch(getCategoryById(s));
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
        var {id, txtName, sltParent } = this.state;
        const category = {
            id: id,
            name: txtName,
            parentId: sltParent
        };
        await this.props.dispatch(postCategoryData(category));
        if(id !== 0){
            this.props.history.push('/admin/category/categoryList');
        }else{
            var rs = window.confirm("Do you want add product again?")
            if(rs){
                this.setState({
                    id: 0,
                    txtName: '',
                    sltParent: 0
                });
            }
            else{
                this.props.history.push('/admin/category/categoryList');
            }
        }
       
    }

    componentDidMount = async () =>{
        await this.props.dispatch(getCategotyData());
    }   

    componentWillReceiveProps(nextProps){
        const {id, name, parentId} = nextProps.dataById;
        if(id !== 0){
            this.setState({
                id : id,
                txtName : name,
                sltParent: parentId
            })
        }
    }

    render() {
        let slt = [];
        if(this.props.data.length > 0){
            slt = this.props.data.map((data) =>{
                if(data.parentid == null){
                    return(
                        <option value={data.id} key = {data.id}>{data.name}</option>  
                      )
                }     
            })            
        }
        const { txtName, sltParent } = this.state;
        return (
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label>Category Name: </label>
                        <input className="form-control" onChange={this.onChange} value={txtName || ''} name="txtName" />
                    </div>
                    <div className="form-group" >
                        <label>Category: </label>
                        <select className="form-control" onChange={this.onChange} value={sltParent} name="sltParent">
                            <option value="" defaultValue>Choose Parent Category</option>
                        {slt}
                        </select>
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
        dataById: state.category.dataById,
        data : state.category.data
    }

}


export default connect(mapStateToProps)(withRouter(CategoryAddUpdate));
