import React, {useState} from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import SearchResultContainer from './SearchResultContainer';

function SearchBar() { 
    const [search,setSearch] =useState("");
    const handleSearch=(e)=>setSearch(e.target.value);
    
  return (
    <>
        <Search>
            <SearchIconWrapper>
                <SearchIcon sx={{color:"grey"}}/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{color:"black"}}
                value={search}
                onChange={handleSearch}
            />
        </Search>
        <SearchResultContainer query={search}/>
    </>
  )
}
export default SearchBar;


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
padding: theme.spacing(0, 2),
height: '100%',
position: 'absolute',
pointerEvents: 'none',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
color: 'inherit',
'& .MuiInputBase-input': {
padding: theme.spacing(1, 1, 1, 0),
// vertical padding + font size from searchIcon
paddingLeft: `calc(1em + ${theme.spacing(4)})`,
transition: theme.transitions.create('width'),
width: '100%',
[theme.breakpoints.up('sm')]: {
width: '60ch',
'&:focus': {
    width: '100ch',
},
},
},
}));