import React, {PropTypes} from 'react';
import ChangePasswordForm from './components/ChangePasswordForm';
import FormNav from './components/FormNav';
import style from './LoginPage.scss';

class ChangePasswordPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      query: ''
    };
  }

  parseQueryString(query) {
    const keyValuePairs = query.replace('?','').split('&');
    const res = {
      email: null,
      oldPassword: null
    };
    keyValuePairs.forEach((kvStr) => {
      const kv = kvStr.split("=");
      if(kv[0] == 'email'){
        res.email = kv[1];
      }
      if(kv[0] == 'oldPassword'){
        res.oldPassword = kv[1];
      }
    });

    return res;
  }

  render() {
    console.log(this.props.location);
    // const search = this.props.location.search
    const emailAndOldPassword = this.parseQueryString(this.props.location.search);

    return (
      <div className="col-10">
        <div className="card">
          <div className="card-header">
            <FormNav />
          </div>

          <div className="container ptm-form-contrainer">
            <ChangePasswordForm
              email={emailAndOldPassword.email}
              oldPassword={emailAndOldPassword.oldPassword}/>
          </div>

        </div>
      </div>
    );
  }
}

export default ChangePasswordPage;