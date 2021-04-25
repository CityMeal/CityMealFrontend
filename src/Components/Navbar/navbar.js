import React from 'react';
import styled from 'styled-components'
import logo from '../Images/logo.png'
import UnAuthNav from './UnAuthNav';
import { logoStyles } from '../Forms/formStyle';
import AuthNav from './AuthNav';

//Styled-Component Styling
const DivStyle = styled.div`
  width: 100vw;
  height: 6.5em;
  background-color: #325288;
`


function NavBar(props) {

  const logoClasses = logoStyles()

  return (
    <DivStyle className="Nav">
      <img src={logo} alt="logo" id='logo' className={logoClasses.root} />
      {!props.userSignedIn.signedIn
        ?
        <UnAuthNav
          signupChange={props.signUpOnChange}
          signinChange={props.signInOnChange}
          userVals={props.userVals}
          loginVals={props.loginVals}
          submitUser={props.onSubmitUser}
          submitLogin={props.onSubmitLogIn} />
        :
        <AuthNav
          logout={props.logout} />
      }
    </DivStyle >
  );
}
export default NavBar;