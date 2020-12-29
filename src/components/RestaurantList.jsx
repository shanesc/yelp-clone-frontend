import React, { useEffect, useContext } from 'react';
import { url } from '../apis/restaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantItem from './RestaurantItem';

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(
    RestaurantsContext
  );

  const fetchRestaurants = async () => {
    try {
      const res = await fetch(url.restaurants);
      const data = await res.json();
      setRestaurants(data.data.restaurants);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // TODO: change to .then promises and put function in useEffect
    fetchRestaurants();
  }, []);

  const renderRestaurants = (restaurantsArray) => {
    return restaurantsArray.map((restaurant) => (
      <RestaurantItem key={restaurant.id} restaurant={restaurant} />
    ));
  };

  return (
    <>
      {restaurants ? (
        <div className="list-group">
          <table className="table table-hover table-dark">
            <thead>
              <tr className="bg-primary">
                <th scope="col">Restaurant</th>
                <th scope="col">Location</th>
                <th scope="col">Price Range</th>
                <th scope="col">Ratings</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            {/* TODO: Add favorite/star feature */}
            <tbody>{renderRestaurants(restaurants)}</tbody>
          </table>
        </div>
      ) : (
        <h3 className="text-center">Loading...</h3>
      )}
    </>
  );
};

export default RestaurantList;
