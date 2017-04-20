import React, {PropTypes} from 'react';
import FormNav from './components/FormNav';
import SignupForm from './components/SignupForm';
import style from './LoginPage.scss';

class SignupPage extends React.Component {
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
            <SignupForm />
          </div>

        </div>
      </div>
    );
  }
}

export default SignupPage;