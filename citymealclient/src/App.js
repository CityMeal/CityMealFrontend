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
  const signInLabels = ['email', 'password']

  const [openModal, setOpenModal] = React.useState(false)

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
    email: "",
    password: ""
  })
  const [userSignedIn, setUserSignedIn] = React.useState({
    signedIn: false,
    // currentUser: {},
    token: '',
  })

  const [currentUser, setcurrentUser] = React.useState({})

  const [labels, setLabels] = React.useState(signUpLabels)




  //RETURN SIGN UP FORM ON CLICK ON SIGN UP BUTTON. THIS OPENS MODAL
  const handleSignUpClick = (e) => {
    setOpenModal(true)
    // console.log('clicking sign up', openModal)
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
    const { name, value } = event.target

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
  const signUpUser = async () => {
    console.log(newUser)
    //Write a function to post user in database
    await fetch(
      `${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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


  // const getUser = async () => {
  //   const token = userSignedIn.token
  //   console.log(token)
  //   await fetch(
  //     `${BASE_URL}/user`, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Authorization':`Bearer ${token}`
  //     },
  //   })
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(err => console.log(err))
  // }

  //USE LOGIN DETAIL OBJECT TO AUTHENTICATE USER: WRITE AUTH FUNCTION
  const signInUser = async () => {

    console.log(logInDetails)

    //Write a POST request to user login route on the back end
    await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logInDetails)
    })
      .then(response => response.json())
      .then(data => {
        setUserSignedIn({
          signedIn: true,
          token: data.token
        })
        setcurrentUser(
          data.user
        )
      })
      .catch(err => console.log(err))
    setLogInDetails({
      username: "",
      password: ""
    })
    // getUser()
  }

  //HANDLE UPDATE USERS
  function handleChange(e) {
    const value = e.target.value;
    console.log(e.target.name, value)
    setcurrentUser({
      ...currentUser,
      [e.target.name]: value,
    })
  }


  //UPDATE USER
  const updateUser = async () => {
    const token = userSignedIn.token
    // console.log(token)
    await fetch(
      `${BASE_URL}/user`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      // body: JSON.stringify(userSignedIn.currentUser)
      body: JSON.stringify(currentUser)

    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }


  //delete route 
  const deleteUser = async () => {
    const token = userSignedIn.token
    //Write a POST request to user login route on the back end
    await fetch(`${BASE_URL}/user`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => {
        return response.json()
      })
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }


  return (
    <div className="App">
      <Header
        clickSignUpBtn={handleSignUpClick}
        clickSignInBtn={handleSignInClick}
      />
      <Announce />
      {!userSignedIn.signedIn ?
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
        <Favorites user={currentUser} handleUser={handleChange} updateUser={updateUser} deleteUser={deleteUser} />
      }
      <Footer />
    </div>
  );
}

export default App;
