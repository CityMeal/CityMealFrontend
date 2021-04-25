import React from 'react';
import './navbar.css'
import styled from 'styled-components'
import newlogo from '../Images/newlogo.png'
import Forms from '../MainPage/FormModal'
import { Button, Menu, MenuItem, makeStyles, createMuiTheme, ThemeProvider, useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom';

//Styled-Component Styling
// const DivStyle = styled.div`
//   display: flex,
//   justify-content: space-between,
//   width: 100vw;
//   height: 6.5em;
//   background-color: #325288;
// `

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    backgroundColor: '#325288',
    height: '6.5em',
  },
}));

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
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // width: 30 + '%',
    // position: 'relative',
    top: -2 + 'em',
    paddingRight: 3 + '%',
    // left: 14.5 + 'em',
    // borderRadius: 2 + 'px',
    color: '#FFFFFF',
    fontSize: 30 + 'px',
    // [themes.breakpoints.down('sm')]: {//340
    //   position: 'relative',
    //   left: 12.6 + 'em',
    // },
    // [themes.breakpoints.up('lg')]: {//412 or more/699
    //   // position: 'relative',
    //   // left: 16.8 + 'em',
    // },
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
  const classes = useStyles();
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

  return (
    // <DivStyle className="Nav">
    <div className={classes.root} >
      <img src={newlogo} alt="logo" id='logo' className={logoClasses.root} />
      <div className={btnClasses.signBtn}>
        {
          !props.userSignedIn.signedIn
            ?
            //sign up and sign in btn
            buttons.map((button, index) => (
              <Button
                // variant="contained"
                id={`button${index}`}
                key={button}
                className={btnClasses.root}
                size="small"
                onClick={button === 'Sign Up' ? handleSignUpClick : handleSignInClick}
              >{button}</Button>))
            :
            // user name and drop down 
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
      </div>
      < Forms
        clickedBtn={clickedBtn}
        closeModal={handleModalClose}
        signupChange={props.signUpOnChange}
        signinChange={props.signInOnChange}
        userVals={props.userVals}
        loginVals={props.loginVals}
        submitUser={props.onSubmitUser}
        submitLogin={props.onSubmitLogIn}
      />

    </div >
    // </DivStyle>
  );
}
export default Header;