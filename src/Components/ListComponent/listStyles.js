import React from 'react';
import { makeStyles, createMuiTheme, useMediaQuery } from '@material-ui/core';



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
  },
  directionBtn: {
    position: 'relative',
    left: -0.5 + 'em',
    marginTop: '3%',
    marginBottom: '3%',
  },
}));

export {useStyles, themes2, useMediaQuery}