import React from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/Navbar/navbar";
import Footer from "./Components/Footer/footer";
import UnauthenticatedApp from "./unauthenticatedApp";
import { get, post } from "./api";

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackChunkName: "authenticated-app" */ "./authenticatedApp")
);
// import AuthenticatedApp from "./authenticatedApp";

const BASE_URL = "http://localhost:3030";
console.log(process.env.REACT_APP_API_KEY);

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
    console.log("i clicked signup user func");
    const data = await post('/register', newUser)
    console.log(data)
    setNewUser({
      username: "",
      email: "",
      address: "",
      city: "",
      zipcode: "",
      password: "",
    });
  };
  console.log(logInDetails)

  //USE LOGIN DETAIL OBJECT TO AUTHENTICATE USER: WRITE AUTH FUNCTION
  const signInUser =  async (e) => {
    e.preventDefault();
    console.log(logInDetails)
    const data = await post('/login', logInDetails)
    setUserSignedIn({
      signedIn: true,
      token: data.token,
      currentUser: data.user,
    });
    history.push('/HOME')
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));
    //Reset login details to empty strings
    setLogInDetails({
      email: "",
      password: "",
    });
  };

  const getUpdatedUser = (updatedUser) => {
    console.log(updatedUser)
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
        console.log(data);
        window.alert("added to the favorite list");
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    const getFav = () => {
      const id = userSignedIn.currentUser.id;
      if (!id) {
        console.log("There is no user id");
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

  //GET ALL LOCATIONS AND CREATE SITE POSITION COORDINATES FOR MAP VIEW
  React.useEffect(() => {
    const getAllLocation = () => {
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
          setLocations(data.locations)
        })
        .catch(err => console.log(err))
    }
    getAllLocation()
    console.log(userSignedIn.currentUser, 'should be updated one')
    console.log(console.log(localStorage.getItem('user')))
  }, [], [])


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
    console.log(userSignedIn.currentUser);
  }, []);

  //LOG USER OUT
  const logOut = () => {
    console.log("im clicking button");
    const removItems = ["user", "token"];
    setUserSignedIn({
      signedIn: false,
      currentUser: {},
      token: "",
    });
    removItems.forEach((item) => {
      localStorage.removeItem(item);
    });
    history.push("/HOME");
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
              locations={locations}
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