import React from 'react';
import './navbar.css'
import styled from 'styled-components'
import logo from '../Images/logo.png'
import Forms from '../MainPage/FormModal'
import { Button, Menu, MenuItem, makeStyles, createMuiTheme, ThemeProvider, useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
    width: 30 + '%',
    position: 'relative',
    top: -3 + 'em',
    left: 14.5 + 'em',
    borderRadius: 2 + 'px',
    color: '#FFFFFF',
    fontSize: 17 + 'px',
    [themes.breakpoints.down('sm')]: {//340
      position: 'relative',
      left: 12.6 + 'em',
    },
    [themes.breakpoints.up('lg')]: {//412 or more/699
      position: 'relative',
      left: 16.8 + 'em',
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
function Header(props) {

  const btnClasses = btnstyles()
  const userNameBtnStyles = userNameBtnStyle()
  const logoClasses = logoStyles()

  const buttons = ['Sign Up', 'Sign In']
  
  const menuList = ['HOME', 'LIST', 'FAVORITES', 'PROFILE', 'SIGNOUT'] //LIST PAGE IS THE HOMEPAGE FOR NOW

  const [clickedBtn, setClickedBtn] = React.useState(null)


  //SET LOGGED DROP DOWN MENU STATE
  const [openMenu, setOpenMenu] = React.useState({
    open: false,
    anchorEl: null
  })

  //RETURN SIGN UP FORM ON CLICK ON SIGN UP BUTTON. THIS OPENS MODAL
  const handleSignUpClick = () => {
    setClickedBtn('SIGN UP')
  }

  //RETURN SIGN IN FORM ON CLICK OF SIGN IN BUTTON
  const handleSignInClick = (e) => {
    setClickedBtn('SIGN IN')
  }
  //CLOSE MODAL FUNCTION
  const handleModalClose = () => {
    setClickedBtn(null)
  }
  //HANDLE MOBILE MENU, FUNCTION TO OPEN MOBILE MENU
  const showMenuOption = (e) => {
    setOpenMenu({
      open: true,
      anchorEl: e.target
    })
  }
  const closeMenu = () => {
    setOpenMenu({
      open: false,
      anchorEl: null
    })
  }
  console.log(props.userSignedIn.signedIn)
  
  return (
    <DivStyle className="Nav">
      <img src={logo} alt="logo" id='logo' className={logoClasses.root} />
      {!props.userSignedIn.signedIn
        ?
        buttons.map((button, index) => (
          <Button
            variant="contained"
            id={`button${index}`}
            key={button}
            className={btnClasses.root}
            size="small"
            onClick={button === 'SIGN UP' ? handleSignUpClick : handleSignInClick}
          >{button}</Button>))
        :
        <div>
          <Button className={userNameBtnStyles.root} onClick={showMenuOption}>{props.userSignedIn.currentUser.username}</Button>
          <Menu open={openMenu.open} anchorEl={openMenu.anchorEl} onClose={closeMenu}>
            {menuList.map(option => (
              (<Link to={option === 'SIGNOUT' ? '/' : option} key={`${option}link`}>
                <MenuItem
                  key={option}
                  onClick={option === 'SIGNOUT' ? props.logout : closeMenu}
                >{option === 'SIGN OUT' ? 'SIGN OUT' : option}</MenuItem>
              </Link>)
            ))}
          </Menu>
        </div>
      }
      <Forms
        clickedBtn ={clickedBtn}
        closeModal ={handleModalClose}
        signupChange={props.signUpOnChange}
        signinChange={props.signInOnChange}
        userVals={props.userVals}
        loginVals={props.loginVals}
        submitUser={props.onSubmitUser}
        submitLogin={props.onSubmitLogIn}
      />
    </DivStyle >
  );
}
export default Header;