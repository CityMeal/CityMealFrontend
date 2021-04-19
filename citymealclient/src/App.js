import React from 'react';
import './App.css';
import Header from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer'
import Announce from './Components/Others/announce'
import Welcome from './Components/MainPage/WelcomePage'
import Favorites from './Components/Favorites/Favorites'
import List from './Components/ListPage/List'

const BASE_URL = "http://localhost:3030"

function App() {

  const signUpLabels = ['username', 'email', 'address', 'city', 'zipcode', 'password']
  const signInLabels = ['email', 'password']

  const [labels, setLabels] = React.useState(signUpLabels)

  //SET SIGN UP SIGN IN MODAL STATE
  const [openModal, setOpenModal] = React.useState(false)

  //SET SITES LOCATIONS
  const [locations, setLocations] = React.useState([])

  //SET FAVORITE SITES 
  // const [favorites, setFavorites] = React.useState([])

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
    token: '',
    currentUser: {}
  })
  //SET MOBILE MENU STATE
  const [openMenu, setOpenMenu] = React.useState({
    open: false,
    anchorEl: null
  })


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


  //USE LOGIN DETAIL OBJECT TO AUTHENTICATE USER: WRITE AUTH FUNCTION
  const signInUser = async (e) => {
    e.preventDefault();
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
          token: data.token,
          currentUser: data.user
        })
        //Store User in LocalStorage. Remove from localstorage only on logout
        localStorage.setItem('user', JSON.stringify(data.user))
      })
      .catch(err => console.log(err))

    //Reset login details to empty strings
    setLogInDetails({
      username: "",
      password: ""
    })

  }

  //LOG USER OUT
  const logOut = () => {
    console.log('im clicking button')
    setUserSignedIn({
      signedIn: false,
      currentUser: {},
      token: "",
    })
    setOpenMenu({
      open: false,
      anchorEl: null
    })
    localStorage.clear()
  }

  //HANDLE UPDATE USER CHANGE
  function handleChange(e) {
    const value = e.target.value;
    // console.log(e.target.name, value)
    // setcurrentUser({
    //   ...currentUser,
    //   [e.target.name]: value,
    // })

    setUserSignedIn(prevState => ({
      ...prevState,
      currentUser: {
        ...prevState.currentUser,
        [e.target.name]: value
      }
    }))
  }


  //UPDATE USER
  const updateUser = async () => {
    const token = userSignedIn.token
    console.log('I AM CLICKING SUBMIT')
    console.log(userSignedIn.token)
    console.log(userSignedIn.currentUser)
    await fetch(`${BASE_URL}/user`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        username: userSignedIn.currentUser.username,
        zipcode: userSignedIn.currentUser.zipcode
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  //DELETE USER
  const deleteUser = async () => {
    // const token = userSignedIn.token
    //Write a POST request to user login route on the back end
    await fetch(`${BASE_URL}/user`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${userSignedIn.token}`
      },
    })
      .then(response => {
        return response.json()
      })
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  //GET ALL LOCATIONS
  const getAllLocations = async () => {
    await fetch(`${BASE_URL}/locations`, {
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setLocations(data.locations)
      })
      .catch(err => console.log(err))
  }

  //FILTER LOCATIONS BY EITHER ZIP CODE OR BOROUGH

  const filterLocations = async () => {
    //get the filter label value, if it is zip, make a all to the '/getLocations/:zipcode' route, 
    //if it is Borugh make a call to the Borugh route
  }

  //CHECK LOCAL STORAGE EACH TIME APP LOADS TO SEE IF THERE IS A USESR
  React.useEffect(() => {
    console.log(localStorage)
    const loggedInUser = localStorage.getItem("user")
    console.log(loggedInUser)
    if (loggedInUser) {
      const userFound = JSON.parse(loggedInUser)
      console.log(userFound, loggedInUser)
      setUserSignedIn(prevState => ({
        ...prevState,
        signedIn: true,
        currentUser: userFound
      }))
    }
    getAllLocations()
    filterLocations()
  }, [], [])


  // //ADD FAVORITE SITE
  // const addFav = async (e) => {
  //   // let locationId = locations.map(location => { location.id })
  //   // e.preventDefault();
  //   // console.log(typeof e.target.name)

  //   const id = userSignedIn.currentUser.id
  //   const locationId = parseInt(e.target.name)
  //   const locationName = parseInt(e.target.name)
  //   const locationCity = parseInt(e.target.name)
  //   console.log(locationId)


  //   await fetch(`${BASE_URL}/user/${id}/savefavorite`, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       user_id: userSignedIn.currentUser.name,
  //       location_id: locationId,
  //       name: locationName,
  //       city: locationCity
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data)
  //     })
  //     .catch(err => console.log(err))
  // }

  // //GET ALL FAVORITE SITES
  // const getFav = async (e) => {
  //   const id = userSignedIn.currentUser.id

  //   await fetch(`${BASE_URL}/user/${id}/getfavorites`, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       // setFavorites(data)
  //       console.log(data)
  //     })
  //     .catch(err => console.log(err))
  // }

  // DELETE FAVORITE
  const deleteFav = async () => {
    const token = userSignedIn.token
    const id = userSignedIn.currentUser.id

    await fetch(`${BASE_URL}/${id}/deletefavorite`, {
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

  //POST RATE 
  const rate = async (e) => {
    const token = userSignedIn.token
    const userId = userSignedIn.currentUser.id
    // const locationId

    await fetch(`${BASE_URL}/users/${userId}/locations/:location_id/ratings`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({

      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <Header
        clickSignUpBtn={handleSignUpClick}
        clickSignInBtn={handleSignInClick}
        userSignedIn={userSignedIn}
        logout={logOut}
        closeMenu={closeMenu}
        openMenu={showMenuOption}
        menuOpt={openMenu}
      />
      <Announce />
      {/* <Welcome
        labels={labels}
        modalOpen={openModal}
        modalClose={handleModalClose}
        valueChange={handleValueChange}
        // logInChange={handleLogInChange}
        userVal={newUser}
        loginVal={logInDetails}
        onSubmitUser={signUpUser}
        onSubmitLogIn={signInUser}
        locations={locations}
        addFav={addFav}
      />
      <Favorites
        user={userSignedIn.currentUser}
        handleUser={handleChange}
        updateUser={updateUser}
        deleteUser={deleteUser}
        locations={locations}
        favorites={favorites}
        getFav={getFav}
      /> */}
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
          locations={locations}
        // addFav={addFav}
        /> :
        <Favorites
          user={userSignedIn.currentUser}
          handleUser={handleChange}
          updateUser={updateUser}
          deleteUser={deleteUser}
          locations={locations}
          deleteFav={deleteFav}
        />
      }
      <Footer />
    </div>
  );
}

export default App;
