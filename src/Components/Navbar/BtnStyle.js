import React from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core';

const themes = createMuiTheme({
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

const themes2 = createMuiTheme({
  breakpoints: {
    values: {
      laptop: 1024,
      desktop: 1280,
    },
  },
})


const logoStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    width: 5 + 'em',
    height: 5 + 'em',
    left: 1 + 'em',
    top: 0.6 + 'em',
    [themes2.breakpoints.up('laptop')]: {
      position: 'relative',
      left: 2 + 'em',
    }
  }
}))

const btnstyles = makeStyles(() => ({
  root: {
    color: '#f4eee8',
    top: - 2.5 + 'em',
    marginRight: 1.5 + 'em',
    float: 'right',
    fontSize: 1.5 + 'em',
  },
  signBtn: {
    marginTop: '5%',
    marginLeft: 40 + 'em',
    float: 'right',
    position: 'relative',
    [themes.breakpoints.between('xs', 'sm')]: {
      fontSize: 10 + 'px',
      marginTop: 7 + 'em',
      marginLeft: 1 + 'em',
    },
    [themes.breakpoints.between('sm', 'xl')]: {//360 - 411
      fontSize: 12 + 'px',
      marginTop: 6.5 + 'em',
      marginLeft: 0 + 'em',
    },
  },
}))


export { btnstyles };