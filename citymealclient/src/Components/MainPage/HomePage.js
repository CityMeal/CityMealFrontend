import React from 'react';
import Announcement from '../Others/announce';
import Filter from '../ListComponent/Filter';
import Forms from '../MainPage/FormModal';
import { makeStyles, createMuiTheme, useMediaQuery, Popover, Typography } from '@material-ui/core';

import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api' //I need to hide this

const key = "AIzaSyC4DRbqgSVfVfyh8U1_TYcROL041wHGScE"

const mapDiv = {
    // border: 'solid blue',
    width: '99vw',
    height: '75vh',
    position: 'relative',
    margin: 'auto'
}

const alert = {
    width: '20em',
    height: '20em',
    borderRadius: '5px',
    border: '2px solid black'
}
const themes2 = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 340,
            md: 360,
            lg: 411,
            xl: 700,
            tablet: 760,
            laptop: 1024,
            desktop: 1280,
        },
    }
})

const homeStyles = makeStyles((theme) => ({
    mainDiv: {
        // border: 'solid red',
        // height: '100%'
    },
    filterMapDiv: {
        // border: 'solid green',
        width: '100%',
        // height: '33em',
        position: 'relative',
        margin: 'auto',
        [themes2.breakpoints.between('xs', 'sm')]: {
            // border: 'solid black',
            // height: '30em',
        },
        [themes2.breakpoints.up('tablet')]: {
            // border: 'solid orange',
            // height: '52em',
        },
        [themes2.breakpoints.up('laptop')]: {
            // border: 'solid black',
            // height: '35em',
        },
    },
    popOver: {
        width: '20em',
        height: '20em',
        borderRadius: '5px',
        border: '2px solid black'
    }

}))


function AlertComponent(props) {

    return (
        <div>
            <Popover
                open={props.open}
                anchorEl={props.anchorEl}
                onClose={props.close}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography>Please Sign In To Save Locations</Typography>
            </Popover>
        </div>
    )
}
function HomePage(props) {

    const classes = homeStyles()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //SET USER POSITION
    const [usersLocation, setUsersLocation] = React.useState({})
    const [siteSelected, setSiteSelected] = React.useState({})

    //SET USERS LOCATION STATE ONECE LOADED FROM USEEFFECT
    const success = (position) => {
        const userposition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        }
        setUsersLocation(userposition)
    }

    const handleSeclect = (site) => {
        setSiteSelected(site)
    }

    React.useEffect(() => {
        //GET FIRST LOCATION OF USER ON PAGE LOAD
        navigator.geolocation.getCurrentPosition(success)
        //Look up navigator.watchPosition 
    })


    return (
        <div className={classes.mainDiv}>
            <Announcement />
            <div className={classes.filterMapDiv}>
                <Filter />
                <LoadScript googleMapsApiKey={key}>
                    <GoogleMap
                        mapContainerStyle={mapDiv}
                        zoom={12}
                        center={usersLocation}
                    >
                        {props.siteCoords.map(site => {
                            return (
                                <Marker
                                    key={site.name}
                                    position={site.position}
                                    onClick={() => handleSeclect(site)}
                                />
                            )
                        })}
                        {
                            siteSelected.position &&
                            (
                                <InfoWindow
                                    position={siteSelected.position}
                                    clickable={true}
                                    onCloseClick={() => setSiteSelected({})}
                                >
                                    <div>
                                        <p>Food Center: {siteSelected.name}</p>
                                        <p>Address: {siteSelected.address}</p>
                                        <p>Zip Code: {siteSelected.zip}</p>
                                        <button onClick={() => window.alert('Please Sign In To Save Locations')}>❤️</button>
                                    </div>
                                </InfoWindow>
                            )
                        }
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    )
}

export default HomePage;