import React, { useState, useEffect } from 'react';
import Search from './Search';
import Shimmer from './Shimmer';
import NoDataFound from './NoDataFound';
import RestaurantCard from './RestaurantCard';
import { useFetch, useOnline } from '../utils/hooks';
import { filterRestaurants } from '../utils/restaurantFilter';
import TicTac from './TicTac';

function Body() {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const { data, loading } = useFetch(
    'restaurants/list/v5?lat=12.9715987&lng=77.5945627&page_type=DESKTOP_WEB_LISTING'
  );

  const isOnline = useOnline();
  console.log('isOnline--->', isOnline);

  useEffect(() => {
    if (data) {
      setAllRestaurants(data?.data?.cards?.[2]?.data?.data?.cards);
      setFilteredRestaurants(data?.data?.cards?.[2]?.data?.data?.cards);
    }
  }, [data]);

  const onChangeText = (value) => {
    const dataSet = filterRestaurants.call(allRestaurants, value);
    setFilteredRestaurants(dataSet);
  };

  if (!isOnline) {
    return <TicTac />;
  }

  return (
    <>
      <Search onChangeText={onChangeText} />
      {loading ? (
        <Shimmer />
      ) : filteredRestaurants?.length === 0 ? (
        <NoDataFound />
      ) : (
        <RestaurantCard restaurants={filteredRestaurants} />
      )}
    </>
  );
}

export default Body;
