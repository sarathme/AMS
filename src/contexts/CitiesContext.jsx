import { createContext, useContext, useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:9000/';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert('there was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert('there was an error loading data...');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const cityCtx = useContext(CitiesContext);

  if (!cityCtx)
    throw new Error('CitiesContext is used outside Cities Provider');

  return cityCtx;
}

export { CitiesProvider, useCities };