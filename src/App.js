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

const BASE_URL = "https://city-meal.herokuapp.com"
console.log(process.env.REACT_APP_API_KEY)

function App() {
  const history = useHistory();

  //SET SITES LOCATIONS
  const [locations, setLocations] = React.useState([]);

  //SET FAVORITE SITES
  const [favorites, setFavorites] = React.useState([]); //MOVE TO FAVORITES PAGE

  //SET NEW USER STATE
  const [newUser, setNewUser] = React.useState({
    username: "",
    email: "",
    address: "",
    city: "",
    zipcode: "",
    password: "",
  });

  //SET USER LOG IN DETAILS
  const [logInDetails, setLogInDetails] = React.useState({
    email: "",
    password: "",
  });

  const [userSignedIn, setUserSignedIn] = React.useState({
    signedIn: false,
    token: "",
    currentUser: {},
  });

  //GET NEW USER SIGN UP INFO
  const handleUserValueChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleLoginValueChange = (event) => {
    const { name, value } = event.target;
    setLogInDetails({
      ...logInDetails,
      [name]: value,
    });
  };


  //FUNCTION MAKING A NEW USER POST REQUEST TO THE DATABASE
  const signUpUser = async () => {

    const data = await post('/register', newUser)

    setNewUser({
      username: "",
      email: "",
      address: "",
      city: "",
      zipcode: "",
      password: "",
    });
  };


  //USE LOGIN DETAIL OBJECT TO AUTHENTICATE USER: WRITE AUTH FUNCTION
  const signInUser =  async (e) => {
    e.preventDefault();

    const data = await post('/login', logInDetails)
    setUserSignedIn({
      signedIn: true,
      token: data.token,
      currentUser: data.user,
    });
    history.push('/home')
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));
    //Reset login details to empty strings
    setLogInDetails({
      email: "",
      password: "",
    });
  };

  const getUpdatedUser = (updatedUser) => {
    setUserSignedIn((prevState) => ({
      ...prevState,
      currentUser: updatedUser,
    }))
  }

  
  //DELETE USER
  const deleteUser = () => {
    //Write a POST request to user login route on the back end
    fetch(`${BASE_URL}/user`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userSignedIn.token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  //ADD FAVORITE SITE
  const addFav = (e) => {
    const id = userSignedIn.currentUser.id;
    const locationId = parseInt(e.target.name);

    fetch(`${BASE_URL}/user/${id}/savefavorite`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userSignedIn.currentUser.name,
        location_id: locationId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFavorites(data.favorites);
        window.alert("added to the favorite list");
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    const getFav = () => {
      const id = userSignedIn.currentUser.id;
      if (!id) {
        return;
      }

      fetch(`${BASE_URL}/user/${id}/getfavorites`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFavorites(data.favorites);
        })
        .catch((err) => console.log(err));
    };
    getFav();
  }, [userSignedIn]);


  // DELETE FAVORITE
  const deleteFav = (e) => {
    const token = userSignedIn.token;
    const id = userSignedIn.currentUser.id;
    const locationId = e.target.name;

    fetch(`${BASE_URL}/user/${id}/${locationId}/deletefavorite`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.alert("Deleted from your favorite list");
      })
      .catch((err) => console.log(err));
  };



  //CHECK LOCAL STORAGE EACH TIME APP LOADS TO SEE IF THERE IS A USESR
  React.useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log(loggedInUser, "line 330");
    if (loggedInUser) {
      const userFound = JSON.parse(loggedInUser);
      console.log(userFound, loggedInUser);
      setUserSignedIn((prevState) => ({
        ...prevState,
        signedIn: true,
        currentUser: userFound,
        token: token,
      }));
    }

  }, []);

  //LOG USER OUT
  const logOut = () => {
    const removItems = ["user", "token"];
    setUserSignedIn({
      signedIn: false,
      currentUser: {},
      token: "",
    });
    removItems.forEach((item) => {
      localStorage.removeItem(item);
    });
    history.push("/home");
  };

  return (
    <div className="App">
      <div className="otherContent">
        <NavBar
          userSignedIn={userSignedIn}
          logout={logOut}
          userVals={newUser}
          signUpOnChange={handleUserValueChange}
          signInOnChange={handleLoginValueChange}
          loginVals={logInDetails}
          onSubmitUser={signUpUser}
          onSubmitLogIn={signInUser}
        />
        {userSignedIn.signedIn ? (
          <React.Suspense fallback={<div>Loading...</div>}>
            <AuthenticatedApp
              getUpdatedUser={getUpdatedUser}
              userSignedIn={userSignedIn}
              deleteUser={deleteUser}
              addFav={addFav}
              favorites={favorites}
              deleteFav={deleteFav}
            />
          </React.Suspense>
        ) : (
          <UnauthenticatedApp
            userSignedIn={userSignedIn}
          />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default App;