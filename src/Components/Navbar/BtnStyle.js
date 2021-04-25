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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#325288',
    height: '6.5em',
  },
  userDropdown: {
    display: 'flex',
    justifyContent: 'center',
    height: '5vh',
    fontSize: 20 + 'px',
    [themes.breakpoints.between('lg', 'xl')]: {
      width: '13vw',
    },
  },
  userDropdownLink: {
    textDecoration: 'none !important',
    textAlign: 'center',
    color: '#325288',
  }
}));

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
const desktopMenuStyle = makeStyles(() => ({
  root: {
    backgroundColor: '#E5E5E5',
    top: -2 + 'em',
    marginLeft: 0.7 + 'em',
    borderRadius: 2 + 'px',
    [themes.breakpoints.down('sm')]: {//340
      position: 'relative',
      left: 22 + '%',
    },
  }
}))
const userNameBtnStyle = makeStyles(() => ({
  root: {
    color: '#FFFFFF',
    top: -2 + 'em',
    marginTop: -0.3 + 'em',
    marginRight: 50 + 'px',
    fontSize: 1.5 + 'rem',
    [themes.breakpoints.between('xs', 'sm')]: {
      top: -1.8 + 'em',
      marginTop: - 0.5 + 'em',
      marginRight: 20 + 'px',
      fontSize: 1.2 + 'rem',
    },
  }
}))
const menuOptionStyle = makeStyles(() => ({
  root: {
    width: 10 + 'em',
    top: 64 + 'px',
    left: 212 + 'px',
  },
  '& .MuiMenu-paper': {
    border: 'solid red',
    width: 10 + 'em',
    top: 64 + 'px',
    left: 212 + 'px',
  }
}))


// const btnstyles = makeStyles(() => ({
//   root: {
//     // border:'solid red',
//     width: '10em',
//     display: 'flex',
//     position: 'relative',
//     justifyContent: 'flex-end',
//     top: '-1.4em',
//     left: '10em',
//     borderRadius: 2 + 'px',

//     [themes.breakpoints.between('xs', 'sm')]: {
//       left: 48 + '%',
//     },
//     [themes.breakpoints.up('md')]: {
//       left: 53 + '%',
//     },
//     [themes.breakpoints.up('lg')]: {
//       left: 60 + '%',
//     },
//     [themes.breakpoints.up('xl')]: {
//       left: 78 + '%',
//     },
//     [themes2.breakpoints.up('laptop')]: {
//       left: 83 + '%',
//     }
//   },
//   space: {
//     marginLeft: '8px',
//   }
// }))

export { btnstyles, useStyles, logoStyles, desktopMenuStyle, userNameBtnStyle, menuOptionStyle };