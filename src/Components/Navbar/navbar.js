import React from 'react';
import styled from 'styled-components'
import newlogo from '../Images/newlogo.png'
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
  console.log(props.logout)
  console.log(props.userSignedIn.signedIn)
  const logoClasses = logoStyles()

  return (
    <DivStyle className="Nav">
      <img src={newlogo} alt="logo" id='logo' className={logoClasses.root} />
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
          logout={props.logout}
          userSignedIn={props.userSignedIn} />
      }
    </DivStyle >
  );
}
export default NavBar;