/**
 * Created by ypeng on 2017-04-19.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {storeActions} from '../../services/store';
import StoreCard from './component/StoreCard';
import style from './SearchPage.scss';

class SearchPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      query: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderStore = this.renderStore.bind(this);
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  handleKeyPress(e) {
    if (e.charCode == 13) {
      this.props.actions.searchStore(this.state.query, this.props.login.token);
    }
  }

  renderStore() {
    return this.props.store.data.map((store, idx) => {
      return (<StoreCard store={store} key={idx}/>);
    });
  }

  render() {
    console.log(this.props.store.data);

    return (
      <div className="col-10">
        <div className="huge-input">
          <input
            type="text"
            placeholder="Search LCBO store"
            value={this.state.query}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}/>
        </div>

        {this.props.store.error &&
        <div className="alert alert-danger" role="alert">{this.props.store.error}</div>}

        {this.renderStore()}
      </div>
    );
  }
}

SearchPage.propTypes = {
  store: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    store: state.store,
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(storeActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);