import React from 'react';
import './App.css';
import Header from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer'
import Announce from './Components/Others/announce'
import Welcome from './Components/MainPage/WelcomePage'

function App() {
 
  const signUpLabels = ['Username', 'Email', 'Address', 'City', 'ZipCode', 'Password']
  const signInLabels = ['Username', 'Password']

  const [openModal, setOpenModal] = React.useState(false)
  const [labels, setLabels] = React.useState(signUpLabels)

  //SET NEW USER STATE
  const [newUser, setNewUser] = React.useState({
    Username: "",
    Email: "",
    Address: "",
    City: "", 
    ZipCode: "",
    Password: "",
  })

  //SET USER LOG IN DETAILS
  const [logInDetails, setLogInDetails] = React.useState({
    Username: "",
    Password: ""
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
  const handleUserChange = (event) => {
    const {name, value} = event.target
    console.log(name)
    setNewUser({
        ...newUser,
        [name]: value
    });
    console.log(newUser)
  };

  //FUNCTION MAKING A NEW USER POST REQUEST TO THE DATABASE
  const signUpUser = () => {

    console.log(newUser) 

    //Write post request function

    //update the new user state and clear form
    setNewUser({
      Username: "",
      Email: "",
      Address: "",
      City: "", 
      ZipCode: "",
      Password: "",
    })

  }


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

  //USE LOGIN DETAIL OBJECT TO AUTHENTICATE USER: WRITE AUTH FUNCTION
  const signInUser = () => {
    
    console.log(logInDetails)

    //make a request tp the auth function and clear form
    setLogInDetails({
      Username: "",
      Password: ""
    })
  }

 
  return (
    <div className="App">
      <Header 
        clickSignUpBtn={handleSignUpClick} 
        clickSignInBtn={handleSignInClick} 
      />
      <Welcome 
        labels={labels}
        modalOpen={openModal}
        modalClose={handleModalClose}
        userChange={handleUserChange}
        logInChange={handleLogInChange}
        userVal={newUser}
        loginVal={logInDetails}
        onSubmitUser={signUpUser}
        onSubmitLogIn={signInUser}
      />
      <Announce />
      <Footer />
    </div>
  );
}

export default App;
