import React from 'react';
import Filter from './Filter'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Rating from './Rating';
import { createMuiTheme, useMediaQuery } from '@material-ui/core';


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

const useStyles = makeStyles((theme) => ({
  // divStyle: {
  //   width: '100 %',
  //   top: '1em',
  // },
  filterDiv: {
    display: 'flex',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'baseline',
    position: 'relative',
    [themes2.breakpoints.between('xs', 'sm')]: {
      width: '18em',
      marginRight: '3%',
    },
    [themes2.breakpoints.up('tablet')]: {
      width: '30em'
    }
  },
  zipcodeInput: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '5%',
    position: 'relative',
    top: -4 + 'em',
    left: 3 + 'em',
  },
  listWrap: {
    width: '100vw',
    marginTop: '3%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
    width: '25em',
    margin: '1em 0 2em 0',
    boxShadow: (2 + 'px ' + 3 + 'px ' + 3 + 'px ' + 2 + 'px ' + ' lightgrey'),
    [themes2.breakpoints.up('tablet')]: {
      width: '22em',
      margin: '1em 1em 1em 1em',
    },
    [themes2.breakpoints.up('laptop')]: {
      width: '35em',
      left: '6%',
      margin: '1em 1em 3em 1em',
    }
  },
  pic: {
    display: 'flex',
    height: '15rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '0.5rem',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '0'
    },
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '8%',
  },
  favBtn: {
    border: 'none',
    backgroundColor: 'white',
    width: '5%',
    marginTop: '6%',
  },
  directionBtn: {
    position: 'relative',
    left: -0.5 + 'em',
    marginTop: '10%',
    marginBottom: '3%',
  },
}));


function constructStreetViewURL(location) {
  let url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${location.latitude},${location.longitude}&key=${process.env.REACT_APP_API_KEY}`
  return url
}

function List(props) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.filterDiv}>
        <Filter />
        {/* <TextField id="standard-search" label="zipcode" type="search" /> */}
      </div>
      <div className={classes.listWrap}>
        {props.locations.map(location => (
          <Box className={classes.list} maxWidth="xl" key={location.id} >
            <Box className={classes.pic} borderRadius={16} width={1 / 2}><img height="auto" width="100%" padding-left="3%" src={constructStreetViewURL(location)} alt="map" /></Box>
            <Box className={classes.info}>
              <Box style={{ marginBottom: '13%', color: '#325288' }}>{location.siteAddress}</Box>
              <Box style={{ marginBottom: '13%', color: '#325288' }}>{location.city}</Box>
              <Rating />
              <button className={classes.favBtn} onClick={props.addFav} name={location.id}>❤️</button>
              <Button variant="contained" color="primary" className={classes.directionBtn}><a style={{ textDecoration: "none", color: "white" }} href={`https://www.google.com/maps/place/` + location.siteAddress.split(" ").join("+")} target="_blank">GET DIRECTION</a></Button>
            </Box>
          </Box>
        ))}
      </div>
    </div>
  )
}

export default List