import React from 'react';
import './App.css';
import Header from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer'
import Announce from './Components/Others/announce'
import Welcome from './Components/MainPage/WelcomePage'

function App() {
 
  const[clickSignUp, setClickSignUp] = React.useState(false)
  const[clickSignIn, setClickSignIn] = React.useState(false)

   //RETUN SIGN UP FORM ON CLICK ON SIGN UP BUTTON
  const handleSignUpClick = (e) =>{
    console.log(e.target)
    setClickSignUp(true)
    console.log('clicking sign up', clickSignUp)
  }

  //RETURN SIGN IN FORM ON CLICK ON SIGN IN BUTTON 
  const handleSignInClick = (e) =>{
    console.log(e.target)
    setClickSignIn(true)
    console.log('clicking sign in', clickSignIn)
  }

  //SET USER LOG IN DETAILS 
  const [logInDetails, setLogInDetails] = React.useState({
    Username: "",
    Password: ""
  })

  //GET USER LOG IN DETAILS ONCHANGE
  const handleLogInChange = (event) => {
    console.log(event.target.value)
    const {name, value} = event.target
    console.log(name)
    setLogInDetails({
        ...logInDetails,
        [name]: value
    });
    console.log(logInDetails)
  }

  //USE LOGINDETAIL OBJECT TO AUTHENTICATE USER: WRITE AUTH FUNCTION

 
  return (
    <div className="App">
      <Header clickSignUp={handleSignUpClick} clickSignIn={handleSignInClick}/>
      <Welcome signUp={clickSignUp} signIn={clickSignIn}/>
      <Announce />
      <Footer />
    </div>
  );
}

export default App;
