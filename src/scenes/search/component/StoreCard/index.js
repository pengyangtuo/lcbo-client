import React, {PropTypes} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './StoreCard.scss';

const StoreCard = ({store}) => {
  return (
    <div className="card store-card">
      <div className="card-block">
        <h4 className="card-title">{store.name}</h4>
        <p className="card-text">
          {store.address_line_1}&nbsp;<br/>
          <small>{store.address_line_2},&nbsp;{store.city}</small>
        </p>
        <p className="card-text">{store.telephone}</p>
        <a href="#" class="btn btn-primary">Order Here</a>
      </div>
    </div>
  );
};

export default StoreCard;