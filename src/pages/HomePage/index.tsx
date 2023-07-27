import React from 'react';

import { Attractions } from '../../types/attractions.types';
import Item from '../../components/Item';
import Button from '../../components/Button';
import { calculateDistance } from '../../helpers/calculateDistance';

interface HomePageProps {
  attractions: Attractions[];
}

interface Geolocation {
  y: number;
  x: number;
}

const HomePage: React.FC<HomePageProps> = ({ attractions }) => {
  const [localAttractions, setLocalAttractions] = React.useState<Attractions[]>([]);
  const [myLocalLocation, setMyLocalLocation] = React.useState<Geolocation>({
    y: 0,
    x: 0
  });
  const [searchAttractions, setSearchAttractions] = React.useState<boolean>(false);
  const [favoritesList, setFavoritesList] = React.useState<number[]>([
    4905]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setMyLocalLocation({ y: latitude, x: longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    }
  }

  function sortByNearest(myLocation: Geolocation, locationsList: Attractions[]): Attractions[] {
    const sorted = locationsList.sort((loc1, loc2) => {
      const distance1 = calculateDistance(myLocation.y, myLocation.x, loc1.y, loc1.x);
      const distance2 = calculateDistance(myLocation.y, myLocation.x, loc2.y, loc2.x);
      return distance1 - distance2;
    });
    return sorted;
  }

  const searchAttractionsByLocation = () => {
    setSearchAttractions(true)
    const sortedByNearest = sortByNearest(myLocalLocation, attractions);
    setLocalAttractions(sortedByNearest);
  }

  const handleFavorites = (id: number) => {
    if (favoritesList.includes(id)) {
      const newList = favoritesList.filter((item) => item !== id);
      setFavoritesList(newList);
    } else {
      setFavoritesList([...favoritesList, id]);
    }
  }

  return (
    <div dir='rtl' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>שלום!</h1>
      <Button onClick={() => getLocation()} text='הצג מיקום' />
      {myLocalLocation.x !== 0 && <div>
        <p>Latitude y: {myLocalLocation.y}</p>
        <p>Longitude x: {myLocalLocation.x}</p>
        <Button onClick={() => searchAttractionsByLocation()} text='מצא אטרקציות בסביבתי' />
      </div>}

      {localAttractions && searchAttractions && <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {localAttractions.map((attraction) => {
          return <Item
            key={attraction.id}
            item={attraction}
            myGeolocation={myLocalLocation}
            favoritesList={favoritesList}
            handleFavorites={handleFavorites}
          />
        })}
      </div>}
    </div>
  )
}

export default HomePage;