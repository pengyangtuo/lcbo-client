import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavLink} from 'react-router-dom';
import {loginActions} from '../../../../services/login';

class ChangePasswordForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      password: '',
      message: null,
      error: null
    };

    this.setPassword = this.setPassword.bind(this);
    this.changepassword = this.changepassword.bind(this);
  }

  setPassword(e) {
    this.setState({password: e.target.value, message: null, error: null});
  }

  changepassword(e) {
    e.preventDefault();
    const self = this;
    const changePasswordFuture =
      this.props.actions.changePassword(this.props.email, this.props.oldPassword, this.state.password);

    changePasswordFuture.then((response) => {
      if (response.status >= 400) {
        self.setState({
          error: "change password failed"
        });
      }else{
        self.setState({
          message: "Your password has been changed."
        })
      }
    }).catch((err) => {
      self.setState({
        error: "Something went wrong ..."
      });
    });
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input onChange={this.setPassword} type="password" className="form-control" id="exampleInputPassword1"
                 placeholder="Password"/>
        </div>

        {this.props.login.error &&
        <div className="alert alert-danger" role="alert">{this.props.login.error}</div>}

        {this.state.error &&
        <div className="alert alert-danger" role="alert">{this.state.error}</div>}

        {this.state.message &&
        <div className="alert alert-success" role="alert">{this.state.message}</div>}

        <button onClick={this.changepassword} type="submit" className="btn btn-primary">Change password</button>
      </form>
    );
  }
}

ChangePasswordForm.propTypes = {
  email: PropTypes.string.isRequired,
  oldPassword: PropTypes.string.isRequired,
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
)(ChangePasswordForm);