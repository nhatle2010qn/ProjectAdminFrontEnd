import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { Switch, Route, withRouter } from 'react-router-dom';
import routes from './routes';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { getCurrentUser } from './actions/accountAction';
import LoginComponent from './components/Login/LoginComponent';
import { PrivateRoute } from './helpers/PrivateRoute';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        userName : ''
      },
      show: true
    }
  }

   componentDidMount = async () => {
    await this.props.dispatch(getCurrentUser());
    this.setState({
      currentUser: this.props.currentUser
    });
    if (this.props.currentUser) {
      this.props.history.push('/');
      this.setState({
        show: true
      })
    }
    else {
      this.setState({
        show: false
      })
      this.props.history.push('/Login')
    }
  }

  componentWillReceiveProps(props) {
    if(props.currentUser){
      this.setState({
        currentUser: props.currentUser,
        show: true
      });
    }
    else{
      this.setState({
        currentUser: props.currentUser,
        show: false
      });
    }
    
  }
  render() {
    const { show, currentUser } = this.state;
    return (
      <Layout show={show} currentUser={currentUser}>
        <ToastContainer />
        <Route path='/Login' exact={true} component={LoginComponent} />
        {this.showContent(routes)}
      </Layout>


    );
  }
  showContent = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <PrivateRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      })
    }
    return (
      <Switch>{result}
      </Switch>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}
export default connect(mapStateToProps)(withRouter(App));
