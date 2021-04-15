import React from 'react';
import './App.css';
import Header from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer'
import Announce from './Components/Others/announce'
import Welcome from './Components/MainPage/WelcomePage'
import Favorites from './Components/Favorites/Favorites'

const BASE_URL = "http://localhost:3030"

function App() {
 
  const signUpLabels = ['username', 'email', 'address', 'city', 'zipcode', 'password']
  const signInLabels = ['username', 'password']

  const [openModal, setOpenModal] = React.useState(false)
  const [userSignedIn, setUserSignedIn] = React.useState(false)
  const [labels, setLabels] = React.useState(signUpLabels)

  //SET NEW USER STATE
  const [newUser, setNewUser] = React.useState({
    username: "",
    email: "",
    address: "",
    city: "", 
    zipcode: "",
    password: "",
  })

  //SET USER LOG IN DETAILS
  const [logInDetails, setLogInDetails] = React.useState({
    username: "",
    password: ""
  })
  
  //RETURN SIGN UP FORM ON CLICK ON SIGN UP BUTTON. THIS OPENS MODAL
  const handleSignUpClick = (e) => {
    setOpenModal(true)
    console.log('clicking sign up', openModal)
  }

  //RETURN SIGN IN FORM ON CLICK OF SIGN IN BUTTON 
  const handleSignInClick = (e) => {
    console.log(e.target)
    setLabels(signInLabels)
    setOpenModal(true)
    console.log('clicking sign in', openModal)
  }

  //CLOSE MODAL FUNCTION
  const handleModalClose = () => {  
    setOpenModal(false)
    setLabels(signUpLabels)
  }


  //GET NEW USER SIGN UP INFO
  const handleValueChange = (event) => {
    const {name, value} = event.target

    labels.length > 2 
    ? setNewUser({
      ...newUser,
      [name]: value
    })
    : 
    setLogInDetails({
      ...logInDetails,
      [name]: value
    });
   
  };


  //FUNCTION MAKING A NEW USER POST REQUEST TO THE DATABASE
  const signUpUser = async ()  => {
    console.log(newUser) 
    //Write a function to post user in database
    await fetch(
      `${BASE_URL}/register`, {
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
    //update the new user state and clear form
    setNewUser({
      username: "",
      email: "",
      address: "",
      city: "", 
      zipcode: "",
      password: "",
    })
  }


  //USE LOGIN DETAIL OBJECT TO AUTHENTICATE USER: WRITE AUTH FUNCTION
  const signInUser = () => {
    console.log(logInDetails)

    //Write a function to the authentication request

    setUserSignedIn(true)

    //make a request tp the auth function and clear form
    setLogInDetails({
      username: "",
      password: ""
    })
  }


  return (
    <div className="App">
      <Header 
        clickSignUpBtn={handleSignUpClick} 
        clickSignInBtn={handleSignInClick} 
      />
      <Announce />
      {!userSignedIn ? 
      <Welcome 
        labels={labels}
        modalOpen={openModal}
        modalClose={handleModalClose}
        valueChange={handleValueChange}
        // logInChange={handleLogInChange}
        userVal={newUser}
        loginVal={logInDetails}
        onSubmitUser={signUpUser}
        onSubmitLogIn={signInUser}
      /> : 
      <Favorites />
      }
      <Footer />
    </div>
  );
}

export default App;
