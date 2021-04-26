import React from 'react';
import { makeStyles, createMuiTheme, useMediaQuery } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';


const themes = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 340,
      md: 360,
      lg: 411,
      xl: 700,
      iphone7: 375
    },
  },
})

const themes2 = createMuiTheme({
  breakpoints: {
    values: {
      tablet: 768,
      laptop: 1024,
      desktop: 1280,
    },
  },
})

const mobileStyle = makeStyles(() => ({
  menu: {
    border: 'solid green',
    position: 'relative',
    left: '10em',
    left: '8em',

    [themes.breakpoints.up('md')]: {
      width: '9em',
      left: '13.3em',
      top: '-0.7em',
    },
    [themes.breakpoints.up('iphone7')]: {
      width: '9em',
      left: '14.4em',
      top: '-0.7em',
    },
    [themes.breakpoints.up('lg')]: {
      width: '9em',
      left: '16.5em',
      top: '-0.7em',
    },
    [themes.breakpoints.up('xl')]: {
      left: '38.5em',
      top: '-1em'
    },
    [themes2.breakpoints.up('tablet')]: {
      width: '45em',
      left: '19em',
      top: '-4.5em'
    },
    [themes2.breakpoints.up('desktop')]: {//412 or more/699
      left: '40em',
    },
  },
  name: {
    width: 8 + 'em',
    height: '2em',
    top: '-1.8em',
    left: '7.6em',
    backgroundColor: 'transparent',

    [themes.breakpoints.up('md')]: {
      left: '9.5em',
    },
    [themes.breakpoints.up('iphone7')]: {
      left: '10em',
    },
    [themes.breakpoints.up('lg')]: {
      left: '12em',
    },
    [themes.breakpoints.up('xl')]: {
      left: '37em',
    },
    [themes2.breakpoints.up('tablet')]: {//412 or more/699
      left: '30em',
    },
    [themes2.breakpoints.up('laptop')]: {//412 or more/699
      left: '58em',
      top: '-4em'
    },
  }
}));

const userNameBtnStyle = makeStyles(() => ({
  root: {
    color: '#FFFFFF',
    top: -2 + 'em',
    marginTop: -0.3 + 'em',
    marginRight: 50 + 'px',
    fontSize: 1.5 + 'rem',
    marginLeft: 70 + '%',
    [themes.breakpoints.down('xs')]: {
      marginLeft: 60 + '%',
    },
  }
}))

const dropDown = makeStyles((theme) => ({
  root: {
    backgroundColor: '#325288',
    height: '6.5em',
  },
  userDropdown: {
    display: 'flex',
    justifyContent: 'center',
    height: '5vh',
    fontSize: 20 + 'px',
    [theme.breakpoints.between('lg', 'xl')]: {
      width: '13vw',
    },
  },
  userDropdownLink: {
    textDecoration: 'none',
    textAlign: 'center',
    color: '#325288',
  }
}));


const tabStyle = makeStyles(() => ({
  root: {
    position: 'relative',
    top: '-3.3em',
    marginRight: '1%',

    '& .MuiTabs-flexContainer': {
      justifyContent: 'flex-end',
      fontSize: '20px',
    },
  },
  list: {
    textDecoration: 'none',
    color: 'white',

  }
}))


export { userNameBtnStyle, dropDown, mobileStyle, themes2, useMediaQuery, tabStyle };