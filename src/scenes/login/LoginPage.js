import React, {PropTypes} from 'react';
import LoginForm from './components/LoginForm';
import FormNav from './components/FormNav';
import style from './LoginPage.scss';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      query: ''
    };
  }

  render() {
    return (
      <div className="col-10">
        <div className="card">
          <div className="card-header">
            <FormNav />
          </div>

          <div className="container ptm-form-contrainer">
            <LoginForm />
          </div>

        </div>
      </div>
    );
  }
}

export default LoginPage;