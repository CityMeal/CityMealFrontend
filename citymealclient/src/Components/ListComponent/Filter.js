import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const BASE_URL = "http://localhost:3030"

const useStyles = makeStyles((theme) => ({
    root: {
        // border: 'solid red',
        width: '20em',
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        padding: '0.3%',

    },
    filterBtn: {
        width: '9em',
        // flex: 1,
    },
    zipcodeInput: {
        marginLeft: '6%',
        // flex: 1,
        position: 'relative',
        left: 3 + '%',
    },
    boroughBtn: {
        width: '9em',
        marginLeft: '3%',
        // flex: 1
    }
}));

function FilterByBorough() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.boroughBtn}>
            <Button variant="outlined" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>Boroughs</Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>Bronx</MenuItem>
                <MenuItem onClick={handleClose}>Brooklyn</MenuItem>
                <MenuItem onClick={handleClose}>Manhattan</MenuItem>
                <MenuItem onClick={handleClose}>Staten Island</MenuItem>
                <MenuItem onClick={handleClose}>Queens</MenuItem>
            </Menu>
        </div>
    );
}


function Filter() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [zipcodeFilter, setZipcodeFilter] = React.useState(false)
    const [zipcode, setZipcode] = React.useState("00000")
    const [boroughFilter, setBoroughFilter] = React.useState(false)


    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleZipcodeClick = () => {
        setAnchorEl(null);
        setZipcodeFilter(true);
        setBoroughFilter(false);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        console.log("value:", value)
        setZipcode(value);
    }

    const handleBoroughClick = () => {
        setAnchorEl(null);
        setBoroughFilter(true);
        setZipcodeFilter(false);
    }

    React.useEffect(() => {

        //FILTER LOCATIONS BY EITHER ZIP CODE OR BOROUGH
        //get the filter label value, if it is zip, make a all to the '/getLocations/:zipcode' route, 
        //if it is Borugh make a call to the Borugh route

        const filterLocation = async () => {
            await fetch(`${BASE_URL}/getLocations/:${zipcode}`, {
                headers: {
                    'Accept': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        }
        filterLocation()
    }, [zipcode])

    return (
        <div className={classes.root}>
            <Button variant="outlined" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.filterBtn}>Filter By</Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleZipcodeClick}>zip code</MenuItem>
                <MenuItem onClick={handleBoroughClick}>borough</MenuItem>
            </Menu>

            {zipcodeFilter &&
                <form className={classes.zipcodeInput}>
                    <TextField id="standard-search" label="zip code" type="search" value={zipcode} onChange={handleChange} />
                </form>
                
            }
            <Button size="small" onClick={(e) => setZipcode(e.target.value)}>Enter</Button>
            {boroughFilter && <FilterByBorough />}
        </div>
    );
}

export default Filter;