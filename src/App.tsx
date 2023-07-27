import axios from 'axios';
import React from 'react';
import HomePage from './pages/HomePage';
import { Attractions } from './types/attractions.types';

const App = () => {
  const [attractions, setAttractions] = React.useState<Attractions[]>([]);

  React.useEffect(() => {
    getAttractionsRequest();
  }, []);

  const getAttractionsRequest = async () => {
    try {
      const response = await axios.get('http://localhost:3001/get-attractions');
      setAttractions(response.data)
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }

  return (
    <React.Fragment>
      <HomePage attractions={attractions} />
    </React.Fragment>
  );
}

export default App;
