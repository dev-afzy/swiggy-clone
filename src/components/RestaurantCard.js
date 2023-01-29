import React from 'react';
import { CDN_BASE_URL } from '../Constant';
import { Link } from 'react-router-dom';

import '../style.css';

function RestaurantCard({ restaurants }) {
  return (
    <div className='restaurant-main'>
      {restaurants?.map(({ data }) => (
        <Link to={`/restaurant/${data.id}`} key={data.id}>
          <div className='outer' key={data.id}>
            <img
              src={CDN_BASE_URL + data.cloudinaryImageId}
              alt='Avatar'
              className='inner'
            />
            <div className='item'>
              <div className='item-name'>
                <h4>{data.name}</h4>
                <p>{data.cuisines.join(', ')}</p>
              </div>
              <div className='item-price'>
                <p>{data.totalRatingsString}</p>
                <div className='rating'>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default React.memo(RestaurantCard);
