import React from 'react';
import {makeStyles,createMuiTheme ,useMediaQuery } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';


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
const mobileStyle = makeStyles(() => ({
    root: {
      display: 'flex',
      width: '10em',
      backgroundColor: 'grey',
      color:'blue,',
      position:'relative',
      top: '-0.6em',
      zIndex: '1',
      // left: '7em',
      '. & MuiTabs-flexContainerVertical':{
        flexDirection: 'column'
      },

      [themes.breakpoints.up('lg')]: {//412 or more/699
        position: 'relative',
        backgroundColor: 'black',
        // width: '10em',
        left: '17em',

        // '. & MuiTabs-flexContainerVertical':{
        //   flexDirection: 'row'
        // },
      }
    },
    name: {
      width: 8 + 'em',
      position:'absolute',
      top: '-3em',
      color: '#FFFFFF',
      fontSize: 17 + 'px',
    },
  
  }));
  const tablet = makeStyles(() => ({
    root: {
      display: 'flex',
      width: '30em',
      backgroundColor: 'grey',
      color:'blue,',
      // flexGrow: 1,
      position:'relative',
      top: '-5em',
      zIndex: '1',
    },
  }))

export {mobileStyle , tablet};