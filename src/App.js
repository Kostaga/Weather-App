import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import  {MenuItem } from '@mui/material';
import React, {useEffect,useState} from 'react';
import countries from './countries';
import History from './components/History';
import Info from './components/Info';
import Data from './components/Data';
import AutocompleteContainer from './components/Autocomplete';

function App() {

  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchField, setSearchField] = useState('');
  const [history, setHistory] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('London');



  const callHistory = () => {
    fetch('https://weather-app-uzgj.onrender.com/history', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },

    })
    .then(response => response.json())
    .then(data => setHistory(data))
  }

  const callAPI = (country) => {
    setIsLoading(true);
    setWeatherData([]);
    fetch(`https://weather-app-uzgj.onrender.com/search-location`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({country})
    })
    .then(response => response.json())
    .then(data => {
      setWeatherData(data.data); 
      callHistory();
      setIsLoading(false);
      
    })
    .catch(err => console.log("Error", err));


  }


  useEffect(() => {
     callAPI('London');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  if (isLoading) {
    return <h1>Loading...</h1>
  }


  const onChange = (event) => {
    const {value} = event.target;
    setSearchField(value);
  }

  const onHistoryChange = (event) => {
    setSelectedCountry(event.target.value);
    callAPI(event.target.value);
    
  };

  const onSubmit = () => {
    const country = searchField.toLowerCase();

    if (country)
      return callAPI(country);
  }

  const clearHistory = () => {
    fetch(`https://weather-app-uzgj.onrender.com/clear-history`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(setSelectedCountry('')).then(setHistory([]))
    .catch(err => console.log("Error", err));
  }


  const menuItems = history.map((country, index) => {
    return <MenuItem
     key={`${country}-${index}`} 
     value={country} >

      {country.charAt(0).toUpperCase() + country.slice(1,country.length)}
     </MenuItem>
  })


  return (
    <div className="App">
      <main className='main'>
        <h2 className='title'>Weather Application</h2>

       
        
        
        {weatherData &&  <History 
        selectedCountry = {selectedCountry} 
        onHistoryChange = {onHistoryChange}
        menuItems = {menuItems}
        clearHistory = {clearHistory} 
        />
        }


        {weatherData && 
        <AutocompleteContainer 
        onChange = {onChange} 
        countries = {countries}
        onSubmit = {onSubmit}
        />
        }


{weatherData && <Info weatherData = {weatherData} />}


{weatherData && <Data weatherData = {weatherData} /> }


      </main>
     
    </div>
  );
}

export default App;
