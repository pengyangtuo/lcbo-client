import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavLink} from 'react-router-dom';
import {loginActions} from '../../../../services/login';

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      password: ''
    };

    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.login = this.login.bind(this);
  }

  setEmail(e) {
    this.setState({email: e.target.value});
  }

  setPassword(e) {
    this.setState({password: e.target.value});
  }

  login(e) {
    e.preventDefault();
    console.log("login with " + this.state.email + " | " + this.state.password);
    this.props.actions.login(this.state.email, this.state.password);
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input onChange={this.setEmail} type="email" className="form-control" id="exampleInputEmail1"
                 aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input onChange={this.setPassword} type="password" className="form-control" id="exampleInputPassword1"
                 placeholder="Password"/>
        </div>

        {this.props.login.error &&
        <div className="alert alert-danger" role="alert">{this.props.login.error}</div>}


        <button onClick={this.login} type="submit" className="btn btn-primary">Login</button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);