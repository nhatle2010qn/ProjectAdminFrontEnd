import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChartByCategory } from '../../../actions/chartAction';
import * as CanvasJSReact from '../../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            chart: []
        }
    }

    componentDidMount = async () => {
        await this.props.dispatch(getChartByCategory(''));
        this.setState({
            data: this.props.chart
        });
        this.loadData();
    }
    componentWillReceiveProps(props) {
        this.setState({
            data: props.chart
        }, () =>  this.loadData());
       
    }
    loadData = () => {
        let chart = [];

        for (var i = 0; i < this.state.data.length; i++) {
            let data = {
                y: this.state.data[i].count,
                label: this.state.data[i].categoryName
            }
            chart.push(data);
            console.log(chart)
        }
        this.setState({
            chart
        })
    }
    onChangeSelect = (v) =>{
        console.log(v.target.value);
    }

    onClickDate = async (e) =>{
        await this.props.dispatch(getChartByCategory(e.target.value));
       
    }
    render() {
        const options = {
			title: {
				text: "Basic Column Chart"
			},
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: 
					this.state.chart
				
			}
			]
		}
		
        return (
            <div className="card mb-4">
            <div className="card-header">
                <div className="row">
                    <h6 className="m-0 font-weight-bold text-primary col-3">Dashboard</h6>
                    <div className="col-3">
                    <button onClick={this.onClickDate} value="week">Week</button>
                    <button onClick={this.onClickDate} value="month">Month</button>
                    <button onClick={this.onClickDate} value="year">Year</button>
                    
                        
                    </div>
                    <div className="col-6">
                    {/* From: <input type="date" onChange={this.onClickDate}/> To: <input type="date"/> */}
                    </div>
                   
                </div>
            </div>
           
            <CanvasJSChart options={options} />
        </div>
           
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chart: state.chart.data
    }
}
export default connect(mapStateToProps)(Dashboard);