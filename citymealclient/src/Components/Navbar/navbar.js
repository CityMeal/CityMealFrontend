import React from 'react';
import './navbar.css'
import styled from 'styled-components'
import logo from'../Images/logo.png'
import {Button, Menu, MenuItem, makeStyles, createMuiTheme,ThemeProvider, useMediaQuery} from '@material-ui/core';

//NOTE ::
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 960px
// lg, large: 1280px
// xl, extra-large: 1920px
// theme.breakpoints.up(sm/600) =>  screen width >= sm/600
// theme.breakpoints.down(sm/600) => screen width <= sm/600
// theme.breakpoints.only(sm/600) => screen width === sm/600
// theme.breakpoints.between(0/xm, sm/600) => screen width > 0, but <  sm/600 i.e between 0 & 600

//Styled-Component Styling
const DivStyle = styled.div`
  // border: solid red;
  width: 100vw;
  height: 6.5em;
  background-color: #4484CE;
`
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
    top:  -2 + 'em',
    marginLeft: 0.7 +'em',
    borderRadius: 2 + 'px',
    [themes.breakpoints.down('sm')]: {//340
      // border: 'solid red',
      position: 'relative',
      left: 22 +'%',
      // top:  -2+ 'em',
      // borderRadius: 2 + 'px', 
      // marginLeft: 0.7 +'em',
    },
    [themes.breakpoints.between('md', 'lg')]: {//360 - 411
      // border: 'solid green',
      position: 'relative',
      left: 30 +'%',
      // top:  -2+ 'em',
      // borderRadius: 2 + 'px', 
      // marginLeft: 0.7 +'em',
    },
    [themes.breakpoints.up('lg')]: {//412 or more/699
      // border: 'solid purple',
      position: 'relative',
      left: 40 +'%',
      // top:  -2+ 'em',
      // borderRadius: 2 + 'px', 
      // marginLeft: 0.6 +'em',
    },
    [themes.breakpoints.up('xl')]: { // 700 or more 1023
      border: 'solid black',
      position: 'relative',
      left: 65 +'%',
      // top:  -2+ 'em',
      // borderRadius: 2 + 'px', 
      // marginLeft: 0.7 +'em',
    },
    [themes2.breakpoints.up('laptop')]:{//1024 or more
      border: 'solid pink',
      position: 'relative',
      left: 75 +'%',
      // top:  -2+ 'em',
      // borderRadius: 2 + 'px', 
      // marginLeft: 0.7 +'em',
    }
  }
}))

const logoStyles = makeStyles(() => ({
  root: {
    // border: 'solid red',
    position: 'relative',
    width: 5 +'em',
    height: 5 +'em',
    left: 1 + 'em',
    top: 0.6 + 'em',

    [themes2.breakpoints.up('laptop')]:{
      // border: 'solid pink',
      position: 'relative',
      // width: 5 +'em',
      // height: 5 +'em',
      left: 2 + 'em',
      // top: 0.6 + 'em',
    }
  }
}))

function Header(props) {

  const buttons = ['Sign Up', 'Sign In']
  const btnClasses = btnstyles()
  const logoClasses = logoStyles()

  const handleClick = (e) => {
    const button = e.target
    console.log('im  clicking', button, button.id)
    button.id === "button0" ? console.log('im  clicking Sign Up') : console.log('im  clicking Sign In')
  }

  return (
    <DivStyle className="Nav">
      <img src={logo} alt="logo" id='logo'  className={logoClasses.root} />
      {buttons.map ((button, index) => (
        <Button variant="contained" id={`button${index}`} key={button} className={btnClasses.root} size="small" onClick={handleClick}>{button}</Button>
      ))}
    </DivStyle>
  );
}

export default Header;
