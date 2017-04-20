import React, {PropTypes} from 'react';
import {Route, Redirect} from 'react-router-dom';
import SearchPage from './scenes/search/SearchPage';
import LoginPage from './scenes/login/LoginPage';
import SignupPage from './scenes/login/SignupPage';
import ResetPage from './scenes/login/ResetPage';
import ChangePasswordPage from './scenes/login/ChangePasswordPage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Config from './config';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.defaultRoute = this.defaultRoute.bind(this);
    this.searchRoute = this.searchRoute.bind(this);
    this.loginRoute = this.loginRoute.bind(this);
    this.signupRoute = this.signupRoute.bind(this);
  }

  defaultRoute() {
    if(this.props.login.loggedIn){
      return <Redirect to="/search"/>;
    }else{
      return <Redirect to="/login"/>;
    }
  }

  searchRoute() {
    if(this.props.login.loggedIn){
      return <SearchPage />;
    }else{
      return <Redirect to="/login"/>;
    }
  }

  loginRoute() {
    if(this.props.login.loggedIn){
      return <Redirect to="/search"/>;
    }else{
      return <LoginPage/>;
    }
  }

  signupRoute() {
    if(this.props.login.loggedIn){
      return <Redirect to="/search"/>;
    }else{
      return <SignupPage/>;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <Route exact path="/" component={this.defaultRoute}/>
          <Route path="/search" component={this.searchRoute}/>
          <Route path="/login" component={this.loginRoute}/>
          <Route path="/signup" component={this.signupRoute}/>
          <Route path="/reset" component={ResetPage}/>
          <Route path="/changepassword" component={ChangePasswordPage}/>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  // summaryActions: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
