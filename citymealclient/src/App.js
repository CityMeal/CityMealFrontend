import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Header from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer';
import Announce from './Components/Others/announce';
import ListView from './Components/MainPage/ListViewPage';
import HomePage from './Components/MainPage/HomePage';
import Favorites from './Components/Favorites/Favorites';
import Profile from './Components/Favorites/Profile';

const BASE_URL = "http://localhost:3030"
console.log(process.env.REACT_APP_API_KEY)

function App() {
  const history = useHistory();

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
  const signUpUser = (e) => {
    e.preventDefault()
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
    console.log(e.target)
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
        history.push("/HOME");
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


  const updateUser = () => {
    fetch(`${BASE_URL}/user`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userSignedIn.token}`
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
        console.log(data.user)
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(data.user))
      })
      .catch(err => console.log(err))
      history.push("/HOME")
    console.log(localStorage.getItem('user'))
    console.log(userSignedIn.currentUser)
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

  //ADD FAVORITE SITE
  const addFav = (e) => {
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
        setFavorites(data.favorites)
        localStorage.setItem('favorites',)
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
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
    getFav()
  }, [userSignedIn])


  // DELETE FAVORITE
  const deleteFav = (e) => {
    const token = userSignedIn.token
    const id = userSignedIn.currentUser.id
    const locationId = e.target.name

    fetch(`${BASE_URL}/user/${id}/${locationId}/deletefavorite`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json()
      })
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  //GET ALL LOCATIONS AND CREATE SITE POSITION COORDINATES FOR MAP VIEW
  React.useEffect(() => {
    const getAllLocation =  () => {
      fetch(`${BASE_URL}/locations`, {
        headers: {
          'Accept': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          const sites = data.locations.map(site => {
            return {
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
    console.log(userSignedIn.currentUser, 'should be updated one')
    console.log(console.log(localStorage.getItem('user')))
  }, [], [])
 
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

    const loggedInUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    console.log(loggedInUser, 'line 330')
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
    console.log(userSignedIn.currentUser)
  }, [])

  //LOG USER OUT
  const logOut = () => {
    console.log('im clicking button')
    const removItems = ['user', 'token']
    setUserSignedIn({
      signedIn: false,
      currentUser: {},
      token: "",
    })
    removItems.forEach(item =>{ 
      localStorage.removeItem(item)
    }) 
    history.push("/");
  }


  return (

    <div className="App">

      <div className="otherContent">
        <Header
          userSignedIn={userSignedIn}
          logout={logOut}
          userVals={newUser}
          signUpOnChange={handleUserValueChange}
          signInOnChange={handleLoginValueChange}
          loginVals={logInDetails}
          onSubmitUser={signUpUser}
          onSubmitLogIn={signInUser}
        />
        {!userSignedIn.signedIn ?
          <Route exact path="/" render={() => <HomePage
            siteCoords={siteCoords}
            signedIn={userSignedIn.signedIn}
          />} />
          :
          < Switch >
            <Route exact path="/HOME" render={() => <HomePage
              siteCoords={siteCoords}
              signedIn={userSignedIn.signedIn}
            />} />
            <Route exact path="/LIST" render={() => <ListView
              locations={locations} addFav={addFav}
            />} />
            <Route exact path="/FAVORITES" render={() => <Favorites
              user={userSignedIn.currentUser}
              handleUser={handleChange}
              updateUser={updateUser}
              deleteUser={deleteUser}
              locations={locations}
              favorites={favorites}
              deleteFav={deleteFav}
              userSignedIn={userSignedIn}
            />} />
            <Route exact path="/PROFILE" render={() => <Profile
              userSignedIn={userSignedIn}
              updateUser={updateUser}
              handleUser={handleChange}
              deleteUser={deleteUser} />
            } />
          </Switch>
        }
      </div>
      <Footer />
    </div >
  );
}

export default App;