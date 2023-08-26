import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { TextField, InputAdornment } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import React, {useEffect,useState} from 'react';
import countries from './countries';


function App() {

  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchField, setSearchField] = useState('');


  const callAPI = (country) => {

    fetch(`http://localhost:5000/search-location`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({country})
    })
    .then(response => response.json())
    .then(data => {
      setWeatherData(data.data); 
      setIsLoading(false);
    })
    .catch(err => console.log("Error", err));
  }

  useEffect(() => {
      callAPI('London');

  },[]);


  if (isLoading) {
    return <h1>Loading...</h1>
  }


  const onChange = (event) => {
    const {value} = event.target;
    setSearchField(value);
  }

  const onSubmit = () => {
    const country = searchField.toLowerCase();

    if (country)
      return callAPI(country);
  }



  return (
    <div className="App">
      <main className='main'>
        <h2 className='title'>Weather Application</h2>

        <div className='autocomplete'>

        
        <Autocomplete
          onSelect={onChange}
          disablePortal
          id="combo-box-demo"
          options={countries}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField onChange={onChange} className='search' id='standard-basic' label="Search Country" variant='standard'  {...params}  />                   
        }
          />

          <InputAdornment onClick={onSubmit} position="start">
              <SearchOutlinedIcon className='searchIcon' sx={{color: 'white', fontSize:'32px', cursor: 'pointer' } }/>
          </InputAdornment>

          </div>

        <div className='info-container'>
          <img src={weatherData.current.condition.icon} width={'200px'} height={'200px'}  alt='' />
          <div className='weather-temp'>{weatherData.current.temp_c}°C</div>
          <div className='weather-location'>{weatherData.location.name}</div>
        </div>
          
          <div className='data-container'>

            <div className='element-container'>

              <div className='element'>
                  <img width={'60px'} src="https://cdn-icons-png.flaticon.com/512/6393/6393411.png" alt='' className='icon' />
                  <div className='data'>
                    <div className='humidity-percent'>{weatherData.current.humidity}%</div>
                    <div className='text'>Humidity</div>
                </div>
              </div>

              <div className='element'>
                  <img width={'60px'}   src="https://cdn-icons-png.flaticon.com/512/3944/3944594.png" alt='' className='icon' />
                  <div className='data'>
                    <div className='humidity-percent'>{weatherData.current.gust_kph}km/h</div>
                    <div className='text'>Wind Speed</div>
                </div>
              </div>

            </div>
            

          </div>
          

      </main>
     
    </div>
  );
}

export default App;
