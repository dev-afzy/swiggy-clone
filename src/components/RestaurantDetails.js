import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import { CDN_BASE_URL } from '../Constant';
import { useFetch } from '../utils/hooks';
import '../style.css';

function RestaurantDetails() {
  const param = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const { data, loading } = useFetch(
    `menu/v4/full?lat=12.9715987&lng=77.5945627&menuId=${param.id}`
  );

  useEffect(() => {
    if (data) {
      setRestaurantDetails(data.data);
    }
  }, [data]);

  return (
    <>
      {loading && restaurantDetails ? (
        <Shimmer />
      ) : (
        <div className='restaurant-details'>
          <div className='section-1'>
            <img
              alt='image'
              className='img-restaurant'
              src={CDN_BASE_URL + restaurantDetails?.cloudinaryImageId}
            />
            <h2>{restaurantDetails?.name}</h2>
            <p>{restaurantDetails?.cuisines?.join(',')}</p>
            <h4>{restaurantDetails?.city}</h4>
            <p>{restaurantDetails?.avgRating}</p>
          </div>
          <div className='section-2'>
            <h2>Menu</h2>
            {restaurantDetails?.menu?.items && (
              <ul>
                {Object.values(restaurantDetails?.menu?.items)?.map((menu) => (
                  <li key={menu?.id}>{menu?.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default RestaurantDetails;
