import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '3%',
    },
    zipcodeInput: {
        marginLeft: '3%',
    },
    boroughBtn: {
        marginLeft: '3%',
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
        setZipcodeFilter(true);
        setAnchorEl(null);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        console.log("value:", value)
        setZipcode(value);
    }

    const handleBoroughClick = () => {
        setBoroughFilter(true);
        setAnchorEl(null);
    }

    return (
        <div className={classes.root}>
            <Button variant="outlined" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>Filter By</Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleZipcodeClick}>zip code</MenuItem>
                <MenuItem onClick={handleBoroughClick}>borough</MenuItem>
            </Menu>

            {zipcodeFilter &&
                <form className={classes.zipcodeInput}>
                    <TextField id="standard-search" label="zip code" type="search" value={zipcode} onChange={handleChange} />
                </form>
            }

            {boroughFilter && <FilterByBorough />}
        </div>
    );
}

export default Filter;