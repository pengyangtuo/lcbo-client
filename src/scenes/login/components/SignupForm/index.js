import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginActions} from '../../../../services/login';

class SignForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      password: ''
    };

    this.setEmail = this.setEmail.bind(this);
    this.setFirstname = this.setFirstname.bind(this);
    this.setLastname = this.setLastname.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.signup = this.signup.bind(this);
  }

  setEmail(e){
    this.setState({email: e.target.value});
  }

  setFirstname(e){
    this.setState({firstname: e.target.value});
  }

  setLastname(e){
    this.setState({lastname: e.target.value});
  }

  setPassword(e){
    this.setState({password: e.target.value});
  }

  signup(e) {
    e.preventDefault();
    const email = this.state.email;
    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    const password = this.state.password;

    console.log("signup with "+email);
    this.props.actions.signup(email, firstname, lastname, password);
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input onChange={this.setEmail} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputFirstname">First name</label>
          <input onChange={this.setFirstname} type="text" className="form-control" id="exampleInputFirstname" placeholder="Enter first name"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputLastname">Last name</label>
          <input onChange={this.setLastname} type="text" className="form-control" id="exampleInputLastname" placeholder="Enter last name"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input onChange={this.setPassword} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>

        {this.props.login.error &&
        <div className="alert alert-danger" role="alert">{this.props.login.error}</div>}

        <button onClick={this.signup} type="submit" className="btn btn-primary">{this.props.login.loading ? 'Loading...' : 'Sign Up'}</button>
      </form>
    );
  }
}


SignForm.propTypes = {
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
)(SignForm);