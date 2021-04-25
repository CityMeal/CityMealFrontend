import React from 'react';
import { makeStyles, createMuiTheme} from '@material-ui/core';

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

const btnstyles = makeStyles(() => ({
  root: {
    // border:'solid red',
    width: '10em',
    display: 'flex',
    position:'relative',
    justifyContent: 'flex-end',
    top: '-1.4em',
    left: '10em',
    borderRadius: 2 + 'px',

    [themes.breakpoints.between('xs', 'sm')]: {
      left: 48 + '%',
    },
    [themes.breakpoints.up('md')]: {
      left: 53 + '%',
    },
    [themes.breakpoints.up('lg')]: {
      left: 60 + '%',
    },
    [themes.breakpoints.up('xl')]: { 
      left: 78 + '%',
    },
    [themes2.breakpoints.up('laptop')]: {
      left: 83 + '%',
    }
  },
  space: {
    marginLeft: '8px',
  }
}))

export { btnstyles };