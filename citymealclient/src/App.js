import React from 'react';
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
  const signUpUser = async (e) => {
    e.preventDefault()
    console.log(newUser)
    console.log('i clicked signup user func')
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
      .then(data => {
        setUserSignedIn(prevState => ({
          ...prevState,
          currentUser: data.user
        }))
      })
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


  //ADD FAVORITE SITE
  const addFav = async (e) => {
    // let locationId = locations.map(location => { location.id })
    // e.preventDefault();
    // console.log(typeof e.target.name)

    const id = userSignedIn.currentUser.id
    const locationId = parseInt(e.target.name)
    const locationName = parseInt(e.target.name)
    const locationCity = parseInt(e.target.name)
    console.log(locationId)


    await fetch(`${BASE_URL}/user/${id}/savefavorite`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userSignedIn.currentUser.name,
        location_id: locationId,
        name: locationName,
        city: locationCity
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  //GET ALL FAVORITE SITES
  const getFav = async (e) => {
    const id = userSignedIn.currentUser.id

    await fetch(`${BASE_URL}/user/${id}/getfavorites`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // setFavorites(data)
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  // DELETE FAVORITE
  const deleteFav = async () => {
    const id = userSignedIn.currentUser.id

    await fetch(`${BASE_URL}/${id}/deletefavorite`, {
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
        <HomePage 
          siteCoords={siteCoords}
          signedIn={userSignedIn.signedIn}

        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
