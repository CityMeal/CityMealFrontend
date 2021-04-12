import React from 'react';
import './App.css';
import Header from './Components/Navbar/navbar';
import Welcome from './Components/MainPage/WelcomePage'

function App() {
 
  const[screenSize, setScreenSize] = React.useState(360)
  const[clickSignUp, setClickSignUp] = React.useState(false)
  const[clickSignIn, setClickSignIn] = React.useState(false)

  const [logInDetails, setLogInDetails] = React.useState({
    Username: "",
    Password: ""
  })

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


  const updateNav = () =>{
    setScreenSize(1024)
    console.log('clicking button')
  }

  const handleSignUpClick = (e) =>{
    console.log(e.target)
    setClickSignUp(true)
    console.log('clicking sign up', clickSignUp)
  }

  const handleSignInClick = (e) =>{
    console.log(e.target)
    setClickSignIn(true)
    console.log('clicking sign in', clickSignIn)
  }

  return (
    <div className="App">
      <Header clickSignUp={handleSignUpClick} clickSignIn={handleSignInClick}/>
      <h1>Hello World</h1>
      <button onClick={updateNav}>Click to update nav</button>
      <Welcome signUp={clickSignUp} signIn={clickSignIn}/>
    </div>
  );
}

export default App;
