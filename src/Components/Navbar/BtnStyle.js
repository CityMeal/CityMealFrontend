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
    backgroundColor: '#E5E5E5',
    top: -2 + 'em',
    marginLeft: 0.7 + 'em',
    borderRadius: 2 + 'px',
    [themes.breakpoints.down('sm')]: {//340
      position: 'relative',
      left: 22 + '%',
    },
    [themes.breakpoints.between('md', 'lg')]: {//360 - 411
      position: 'relative',
      left: 30 + '%',
    },
    [themes.breakpoints.up('lg')]: {//412 or more/699
      position: 'relative',
      left: 40 + '%',
    },
    [themes.breakpoints.up('xl')]: { // 700 or more 1023
      border: 'solid black',
      position: 'relative',
      left: 65 + '%',
    },
    [themes2.breakpoints.up('laptop')]: {//1024 or more
      border: 'solid pink',
      position: 'relative',
      left: 75 + '%',
    }
  }
}))

export { btnstyles };