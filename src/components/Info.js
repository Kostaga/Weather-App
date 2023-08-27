const Info = ({weatherData}) => {
	return (

		<div className='info-container'>
          <img src={weatherData.current.condition.icon} width={'200px'} height={'200px'}  alt='' />
          <div className='weather-temp'>{weatherData.current.temp_c}°C</div>
          <div className='weather-location'>{weatherData.location.name}</div>
        </div>
	)
}

export default Info;