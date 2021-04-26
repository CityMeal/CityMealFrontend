import React from 'react';
import { get } from '../../api';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { MenuList } from '@material-ui/core'

const BASE_URL = "http://localhost:3030"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        // margin: 'auto',
        margin: '0 5% 0 3%',
        padding: '0.3%',
    },
    // filterBtn: {
    //     width: '9em',
    //     height: '3em'
    // },
    zipcodeInputForm: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: '5%',
    },
    zipcodeInput: {
        marginRight: '3%',
    },
    // boroughBtn: {
    //     width: '9em',
    //     marginLeft: '3%',
    // }
}));




function Filter(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [boroughAnchorEl, setBoroughAnchorEl] = React.useState(null)

    const [zipcodeFilter, setZipcodeFilter] = React.useState(false)
    const [boroughFilter, setBoroughFilter] = React.useState(false)

    const [zipcode, setZipcode] = React.useState("00000")

    const [selectedBorough, setSelectedBorough] = React.useState('')

    const [param, setParam] = React.useState({
        parameter: '',
        returnedSites: []
    })

    //BORUGH ANCHOR EL AND FUNCTION
    const showBoroughOptions = (e) => {
        setBoroughAnchorEl(e.currentTarget)
    }

    const boroughClose = (e) => {
        console.log(e.target.dataset)
        setBoroughAnchorEl(null);
        // setSelectedBorough(e.currentTarget.dataset)
        const data = e.currentTarget.dataset
        console.log(data)
        // setParam(prevState => ({
        //     ...prevState,
        //     parameter: e.currentTarget.dataset.city
        // }))
    }


    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        setZipcodeFilter(false);
        setBoroughFilter(false);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
    };

    const handleZipcodeClick = () => {
        setAnchorEl(null);
        setZipcodeFilter(true);
        // setBoroughFilter(false);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        console.log("value:", value)
        setZipcode(value);
    }

    const handleBoroughClick = (e) => {
        setAnchorEl(null);
        setBoroughFilter(true);
        setZipcodeFilter(false);

    }



    //FILTER LOCATIONS BY EITHER ZIP CODE OR BOROUGH
    // const filterLocation = async () => {
    //     const paramEntered = param.parameter
    //     console.log(paramEntered)
    //     // const filtered = get(`/getLocations/${paramEntered}`)

    //     // let param = zipcode / [borughs] / addresss&newcuurentpositon //If it's an address, create it into a string or an object
    //     await fetch(`${BASE_URL}/getLocations/${paramEntered}`, {
    //         headers: {
    //             'Accept': 'application/json',
    //         },
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setParam(prevState => ({
    //                 ...prevState,
    //                 returnedSites: data
    //             }))
    //             console.log(data)

    //         })
    //         .catch(err => console.log(err))
    // }
    const filterLocation = async () => {
        const paramEntered = param.parameter
        try {
            const data = await get(`/getLocations/${paramEntered}`)
            setParam(prevState => ({
                ...prevState,
                returnedSites: data
            }))
            props.onResult(data.getLocations);
        } catch (err) {
            //do something with err
            console.log(err)
        }
    }

    React.useEffect(() => {
        console.log(!zipcodeFilter, zipcodeFilter, selectedBorough.city)
        setParam(prevState => ({
            ...prevState,
            parameter: zipcode
        }))
        console.log(param.returnedSites)
    }, [zipcode])
    // console.log(param.returnedSites)


    return (
        <div className={classes.root}>
            <form className={classes.zipcodeInputForm}>
                <TextField className={classes.zipcodeInput} id="standard-search" label="zip code" type="search" value={zipcode} onChange={handleChange} />
                <Button className={classes.zipcodeBtn} variant="outlined" color="primary" onClick={filterLocation}>ENTER</Button>
            </form>
            {/* <Button variant="outlined" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.filterBtn}>Filter By</Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleFilterClose}>
                <MenuItem onClick={handleZipcodeClick}>zip code</MenuItem>
                <MenuItem onClick={handleBoroughClick}>borough</MenuItem>
            </Menu>

            {zipcodeFilter &&
                <form className={classes.zipcodeInputForm}>
                    <TextField className={classes.zipcodeInput} id="standard-search" label="zip code" type="search" value={zipcode} onChange={handleChange} />
                    <Button className={classes.zipcodeBtn} variant="outlined" color="primary" onClick={filterLocation}>ENTER</Button>
                </form>

            }
            {boroughFilter &&
                <div>
                    <Button variant="outlined" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={showBoroughOptions}>Boroughs</Button>
                    <Menu id="simple-menu" variant='selectedMenu' value='Brooklyn' anchorEl={boroughAnchorEl} keepMounted open={Boolean(boroughAnchorEl)} onClose={handleFilterClose}>
                        <MenuItem onClick={boroughClose} data-city="Brooklyn">Brooklyn</MenuItem>
                        <MenuItem onClick={boroughClose} data-city="Manhattan">Manhattan</MenuItem>
                        <MenuItem onClick={boroughClose} data-city="Staten Island">Staten Island</MenuItem>
                        <MenuItem onClick={boroughClose} data-city="Queens">Queens</MenuItem>
                    </Menu>
                    <Button variant="outlined" color="primary" onClick={filterLocation}>ENTER</Button>
                </div>
            } */}
        </div>
    );
}

export default Filter;
