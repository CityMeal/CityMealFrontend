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

const logoStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    width: 5 +'em',
    height: 5 +'em',
    left: 1 + 'em',
    top: 0.6 + 'em',

    [themes2.breakpoints.up('laptop')]:{
      position: 'relative',
      left: 2 + 'em',
    }
  }
}))

const btnstyles = makeStyles(() => ({
  root: {
    backgroundColor: '#E5E5E5',
    top:  -2 + 'em',
    marginLeft: 0.7 +'em',
    borderRadius: 2 + 'px',
    [themes.breakpoints.down('sm')]: {//340
      position: 'relative',
      left: 22 +'%',
    },
    [themes.breakpoints.between('md', 'lg')]: {//360 - 411
      position: 'relative',
      left: 30 +'%',

    },
    [themes.breakpoints.up('lg')]: {//412 or more/699
      position: 'relative',
      left: 40 +'%',

    },
    [themes.breakpoints.up('xl')]: { // 700 or more 1023
      border: 'solid black',
      position: 'relative',
      left: 65 +'%',
    },
    [themes2.breakpoints.up('laptop')]:{//1024 or more
      border: 'solid pink',
      position: 'relative',
      left: 75 +'%',
    }
  }
}))
const desktopMenuStyle = makeStyles(() => ({
  root:{
    backgroundColor: '#E5E5E5',
    top:  -2 + 'em',
    marginLeft: 0.7 +'em',
    borderRadius: 2 + 'px',
    [themes.breakpoints.down('sm')]: {//340
      position: 'relative',
      left: 22 +'%',
    },
  }
}))

const userNameBtnStyle = makeStyles(() => ({
  root:{
    width: 30 + '%',
    position: 'relative',
    top: -3 + 'em',
    left: 14.5 + 'em',
    borderRadius: 2 + 'px',
    color: '#ffffff',
    fontSize: 17 + 'px',
    [themes.breakpoints.down('sm')]: {//340
      position: 'relative',
      left: 12.6 +'em',
    },
    [themes.breakpoints.up('lg')]: {//412 or more/699
      position: 'relative',
      left: 16.8 +'em',

    },
  }
}))
const menuOptionStyle = makeStyles(() => ({
  root:{
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




function Header(props) {

  const buttons = ['Sign Up', 'Sign In']
  const btnClasses = btnstyles()
  const userNameBtnStyles = userNameBtnStyle()
  const desktopMenuStyles = desktopMenuStyle()
  const menuOptionStyles = menuOptionStyle()
  const logoClasses = logoStyles()
  const menuList = ['HOME', 'LIST', 'FAVORITES', 'PROFILE', 'SIGN OUT'] //LIST PAGE IS THE HOMEPAGE FOR NOW
   //SET MOBILE MENU STATE
  //  const [openMenu, setOpenMenu] = React.useState(false)
  //  const [anchorEl, setAnchorEl] = React.useState(null)

  // //HANDLE MOBILE MENU, FUNCTION TO OPEN MOBILE MENU
  // const showMenuOption = (e) => {
  //   console.log(e.target,  openMenu, anchorEl, 'why is menu shwoing up')
  //   setAnchorEl(e.target)
  //   setOpenMenu(true)
  //   console.log(e.target,  openMenu, anchorEl, 'why is menu shwoing up')
  // }
  // const closeMenu =  () => {
  //   console.log('im closing menu', openMenu, anchorEl)
  //   setOpenMenu(false)
  //   setAnchorEl(null)
  // }



  return (
      <DivStyle className="Nav">
        <img src={logo} alt="logo" id='logo'  className={logoClasses.root} />
        {!props.userSignedIn.signedIn ? 
        buttons.map ((button, index) => (
          <Button 
          variant="contained" 
          id={`button${index}`} 
          key={button} 
          className={btnClasses.root} 
          size="small" 
          onClick={button === 'Sign Up' ? props.clickSignUpBtn: props.clickSignInBtn}
        >
        {button}
        </Button> )) :
        <div>
          <Button 
            className={userNameBtnStyles.root}
            onClick={props.openMenu}
          >
            {props.userSignedIn.currentUser.username}
          </Button>
          <Menu open={props.menuOpt.open} anchorEl={props.menuOpt.anchorEl} onClose={props.closeMenu}>
            {menuList.map(option => (
              <MenuItem 
                key={option} 
                onClick={option === 'SIGN OUT'? props.logout: props.closeMenu}
              >{option}
              </MenuItem>
            ))}
          </Menu>
        </div>
        } 
        
    </DivStyle> 
  );
}

export default Header;