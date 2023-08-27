import  {Button, FormControl, InputLabel, Select } from '@mui/material';


const History = ({selectedCountry,onHistoryChange,menuItems,clearHistory}) => {
 return (
	<div className='historyContainer'>
	<FormControl  fullWidth>
	  <InputLabel  id="demo-simple-select-label">History</InputLabel>
	  <Select className='historyField' 
		value={selectedCountry}
		labelId="demo-simple-select-label"
		id="demo-simple-select"
		label="History"
		onChange={onHistoryChange} 
		
	  >
	

		
		{menuItems}
	  </Select>
	</FormControl>

	<Button onClick={clearHistory} color='error' variant="contained">Clear History</Button>

	</div>
 )
}


export default History;