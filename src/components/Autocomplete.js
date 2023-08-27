import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import  {TextField, InputAdornment} from '@mui/material';


const AutocompleteContainer = ({onChange, countries, onSubmit}) => {
	return (
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
	)
}

export default AutocompleteContainer;