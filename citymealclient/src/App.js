import React, { useEffect } from 'react';
import './App.css';
import Header from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer';
import Announce from './Components/Others/announce';
import ListView from './Components/MainPage/ListViewPage';
import HomePage from './Components/MainPage/HomePage';
import Favorites from './Components/Favorites/Favorites';

const BASE_URL = "http://localhost:3030"
console.log(process.env.REACT_APP_key)

function App() {

  //SET SITES LOCATIONS
  const [locations, setLocations] = React.useState([])

  //SET SITE COORDINATES
  const [siteCoords, setSiteCoords] = React.useState([])

  //SET FAVORITE SITES 
  const [favorites, setFavorites] = React.useState([])

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
  

  //GET NEW USER SIGN UP INFO
  const handleUserValueChange = (event) => {
    const { name, value } = event.target
    setNewUser({
        ...newUser,
        [name]: value
      })
  };

  const handleLoginValueChange = (event) => {
    const { name, value } = event.target
    setLogInDetails({
      ...logInDetails,
      [name]: value
    });
  }

  //FUNCTION MAKING A NEW USER POST REQUEST TO THE DATABASE
  const signUpUser = () => {
    console.log(newUser)
    console.log('i clicked signup user func')
    //Write a function to post user in database
    fetch(
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
  const signInUser = (e) => {
    e.preventDefault();
    console.log(logInDetails)
    //Write a POST request to user login route on the back end
    fetch(`${BASE_URL}/login`, {
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
        localStorage.setItem('token', JSON.stringify(data.token))
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
    localStorage.clear()
  }

  //HANDLE UPDATE USER CHANGE
  function handleChange(e) {
    const value = e.target.value;

    setUserSignedIn(prevState => ({
      ...prevState,
      currentUser: {
        ...prevState.currentUser,
        [e.target.name]: value
      }
    }))
  }


  //UPDATE USER
  const updateUser = () => {
    const token = userSignedIn.token
    console.log('I AM CLICKING SUBMIT')
    console.log(userSignedIn.token)
    console.log(userSignedIn.currentUser)
    fetch(`${BASE_URL}/user`, {
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
      .then(data => {
        setUserSignedIn(prevState => ({
          ...prevState,
          currentUser: data.user
        }))
      })
      .catch(err => console.log(err))
  }

  //DELETE USER
  const deleteUser = () => {
    // const token = userSignedIn.token
    //Write a POST request to user login route on the back end
    fetch(`${BASE_URL}/user`, {
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

  // //GET ALL LOCATIONS
  // const getAllLocations = () => {
  //   fetch(`${BASE_URL}/locations`, {
  //     headers: {
  //       'Accept': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       setLocations(data.locations)
  //     })
  //     .catch(err => console.log(err))
  // }

  // //FILTER LOCATIONS BY EITHER ZIP CODE OR BOROUGH

  // // const filterLocations = async () => {
  // //   //get the filter label value, if it is zip, make a all to the '/getLocations/:zipcode' route, 
  // //   //if it is Borugh make a call to the Borugh route
  // // }

  // //CHECK LOCAL STORAGE EACH TIME APP LOADS TO SEE IF THERE IS A USERS
  // React.useEffect(() => {
  //   console.log(localStorage)
  //   const loggedInUser = localStorage.getItem("user")
  //   console.log(loggedInUser)
  //   if (loggedInUser) {
  //     const userFound = JSON.parse(loggedInUser)
  //     console.log(userFound, loggedInUser)
  //     setUserSignedIn(prevState => ({
  //       ...prevState,
  //       signedIn: true,
  //       currentUser: userFound
  //     }))
  //   }
  //   getAllLocations()
  //   // filterLocations()
  // }, [], [])


  //ADD FAVORITE SITE
  const addFav = (e) => {
    // let locationId = locations.map(location => { location.id })
    // e.preventDefault();
    // console.log(typeof e.target.name)

    const id = userSignedIn.currentUser.id
    const locationId = parseInt(e.target.name)
    console.log(locationId)


    fetch(`${BASE_URL}/user/${id}/savefavorite`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userSignedIn.currentUser.name,
        location_id: locationId,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    const getFav = () => {
      const id = userSignedIn.currentUser.id
      if (!id) {
        console.log('There is no user id')
        return
      }

      fetch(`${BASE_URL}/user/${id}/getfavorites`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setFavorites(data.favorites)
        })
        .catch(err => console.log(err))
    }
    getFav()
  }, [userSignedIn])


  // DELETE FAVORITE
  const deleteFav = () => {
    const token = userSignedIn.token
    const id = userSignedIn.currentUser.id

    fetch(`${BASE_URL}/${id}/deletefavorite`, {
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

  //GET ALL LOCATIONS AND CREATE SITE POSITION COORDINATES FOR MAP VIEW
  React.useEffect(() => {
    let coordObj = {
      name: '',
      zip: '',
      address:'',
      position: {
          lat: '',
          lng: ''
      }
    }
    const  getAllLocation = async () => {
      await fetch(`${BASE_URL}/locations`, {
        headers: {
          'Accept': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        const sites = data.locations.map(site => {
          return coordObj = {
            name: site.name,
            zip: site.zip,
            address: site.siteAddress,
            position: {
              lat: parseFloat(site.latitude),
              lng: parseFloat(site.longitude)
            }
          }
        })
        localStorage.setItem('sites', JSON.stringify(sites)) //NOT FULLY SURE IF THIS IS DOING WHAT I WANT IT TO DO
        setSiteCoords(sites)
        setLocations(data.locations)
      })
      .catch(err => console.log(err))
    }
    getAllLocation()
  }, [])

  // //POST RATE 
  // const rate = async (e) => {
  //   const token = userSignedIn.token
  //   const userId = userSignedIn.currentUser.id
  //   // const locationId

  //   await fetch(`${BASE_URL}/users/${userId}/locations/:location_id/ratings`, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: JSON.stringify({

  //     })
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data)
  //     })
  //     .catch(err => console.log(err))
  // }


  
  //CHECK LOCAL STORAGE EACH TIME APP LOADS TO SEE IF THERE IS A USESR
  React.useEffect(() => {
    console.log(localStorage)
    const loggedInUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    console.log(loggedInUser)
    if (loggedInUser) {
      const userFound = JSON.parse(loggedInUser)
      console.log(userFound, loggedInUser)
      setUserSignedIn(prevState => ({
        ...prevState,
        signedIn: true,
        currentUser: userFound,
        token: token
      }))
    }
  }, [])

 

  return (
    <div className="App">
      <div className="otherContent">
        <Header
          userSignedIn={userSignedIn}
          logout={logOut}
          userVals = {newUser}
          signUpOnChange={handleUserValueChange}
          signInOnChange={handleLoginValueChange}
          loginVals={logInDetails}
          onSubmitUser={signUpUser}
          onSubmitLogIn={signInUser}
        />
        {!userSignedIn.signedIn ?
          <HomePage 
            siteCoords={siteCoords}
            signedIn={userSignedIn.signedIn}
          /> :
          // <ListView locations={locations} addFav={addFav}/>
          <Favorites
            user={userSignedIn.currentUser}
            handleUser={handleChange}
            updateUser={updateUser}
            deleteUser={deleteUser}
            locations={locations}
            favorites={favorites}
            deleteFav={deleteFav}
          />
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;
