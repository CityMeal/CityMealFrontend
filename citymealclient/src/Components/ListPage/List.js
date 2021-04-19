import React from 'react';
import Filter from './Filter'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {createMuiTheme, useMediaQuery} from '@material-ui/core';


const themes2 = createMuiTheme({
  breakpoints: {
      values: {
          xs: 0,
          sm: 340,
          md: 360,
          lg: 411,
          xl: 700,
      },
  },
})

const useStyles = makeStyles((theme) => ({
  zipcodeInput: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '5%',
    position: 'relative',
    top: -4 + 'em',
    left: 3 + 'em',
  },
  divStyle : {
    border: 'solid green',
    width: '100 %',
    position: 'absolute',

    [theme.breakpoints.up('md')]: {
      // border: 'solid black',
      top: '3em'
    },
    [theme.breakpoints.up('lg')]: {
      // border: 'solid black',
      top: 3 + 'em',
    },
    
  },
  filterDiv: {
    // border: 'solid orange',
    display: 'flex',
    width: '28em',
    // padding: '3em',
    margin: 'auto',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    position: 'relative',
    [themes2.breakpoints.between('xs', 'sm')]: {
      border: 'solid black',
      width: '18em',

    },
    [theme.breakpoints.up('lg')]: {
      border: 'solid yellow',
    }
  },
  listWrap: {
    border: 'solid red',
    width: '100%',
    height: '60vh',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'scroll',
    boxSizing: 'border-box',
    [theme.breakpoints.up('md')]: {
      // border: 'solid green',
      height: '65vh',
    },
    [theme.breakpoints.up('lg')]: {
      // border: 'solid blue',
      height: '70vh',
    },
  },
  list: {
    // border: 0.5 +'px solid black',
    width: '25em',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    margin: '2%',
    left: '4.5%',
    boxShadow: (2 + 'px ' + 3 + 'px ' + 3 + 'px ' + 2 + 'px ' + ' lightgrey'),
    
    [theme.breakpoints.up('md')]: {
      width: '26em',
    },
    [theme.breakpoints.up('lg')]: {
      width: '35em',
    },
    [theme.breakpoints.up('xl')]: {
      width: '40em',
    },
  },
  directionBtn:{
    // border: 'solid red',
    position: 'relative',
    left: -0.5 + 'em',
  },
  pic: {
    display: 'flex',
    height: '15rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '0.5rem',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // height: '15rem',
    paddingLeft: '5%',
  },
  link: {
    textDecoration: 'none',
    color: '#D9D9D9',
    backgroundColor: '#4484CE',
    textAlign: 'center',
    width: '50%',
    paddingTop: '2%',
    paddingBottom: '2%',
  },
  twolists: {
    display: 'flex',
    flexDirection: 'row',
  },
  showList: {
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  showListLg: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'block',
    }
  }
}));


function List(props) {
  const classes = useStyles();

  return (
    <div className={classes.divStyle}>
      <div className={classes.filterDiv}>
        <Filter />
        <TextField id="standard-search" label="zipcode" type="search" />
      </div>
      
      <div addFav={props.addFav} className={classes.listWrap}>
        {props.locations.map(location => (
          <Box className={classes.list} maxWidth="xl" key={location.id} >
            <Box className={classes.pic} borderRadius={16} width={1 / 2}><img height="auto" width="100%" padding-left="3%" src="https://res.cloudinary.com/dqduwnrb1/image/upload/v1618158659/GoogleMapTA_nkou2y.jpg" alt="map" /></Box>
            <Box className={classes.info} width={1 / 2}>
              <p>{location.name}</p>
              <p>{location.city}</p>
              <Button variant="contained" color="primary" className={classes.directionBtn}><a style={{ textDecoration: "none", color: "white" }} href="https://www.google.com/maps" target="_blank">GET DIRECTION</a></Button>
              {/* <a className={classes.link} href="https://www.google.com/maps" target="_blank">GET DIRECTION</a> */}
              <p>⭐️⭐️⭐️⭐️⭐️</p>
              {/* This material ui button doesn't work, but I'll leave it hear for now */}
              {/* <Button onClick={props.addFav} name={location.id}>test</Button> */}
              {/* This normal button works */}
              <button onClick={props.addFav} name={location.id}>❤️</button>
            </Box>
          </Box>
        ))}
      </div>
    </div>
  )
}

export default List;
