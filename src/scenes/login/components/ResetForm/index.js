import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavLink} from 'react-router-dom';
import {loginActions} from '../../../../services/login';

class ResetForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      message: null,
      error: null
    };

    this.setEmail = this.setEmail.bind(this);
    this.reset = this.reset.bind(this);
  }

  setEmail(e) {
    this.setState({email: e.target.value, message: null, error: null});
  }

  reset(e) {
    e.preventDefault();

    this.setState({
      error: null,
      message: null
    });

    const self = this;
    const resetFuture = this.props.actions.reset(this.state.email);
    resetFuture.then((response) => {
      if (response.status >= 400) {
        self.setState({
          error: "reset password failed"
        });
      }else{
        self.setState({
          message: "We have sent out a reset password email to you."
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
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input onChange={this.setEmail} type="email" className="form-control" id="exampleInputEmail1"
                 aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>

        {this.props.login.error &&
        <div className="alert alert-danger" role="alert">{this.props.login.error}</div>}

        {this.state.error &&
        <div className="alert alert-danger" role="alert">{this.state.error}</div>}

        {this.state.message &&
        <div className="alert alert-success" role="alert">{this.state.message}</div>}


        <button onClick={this.reset} type="submit" className="btn btn-primary">Send reset email</button>
      </form>
    );
  }
}

ResetForm.propTypes = {
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
)(ResetForm);