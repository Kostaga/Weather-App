const Data = ({weatherData}) => {
	return (
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
	)
}


export default Data;