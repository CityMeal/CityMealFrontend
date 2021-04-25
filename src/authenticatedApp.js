import { Route, Switch } from "react-router-dom";
import ListView from "./Components/MainPage/ListViewPage";
import HomePage from "./Components/MainPage/HomePage";
import Favorites from "./Components/Favorites/Favorites";
import Profile from "./Components/Favorites/Profile";

function AuthenticatedApp(props) {
  const {
    userSignedIn,
    locations,
    addFav,
    getUpdatedUser,
    handleChange,
    deleteUser,
    favorites,
    deleteFav,
  } = props;

  return (
    <Switch>
      <Route path="/HOME">
        <HomePage signedIn={userSignedIn.signedIn} />
      </Route>
      <Route path="/LIST">
        <ListView locations={locations} addFav={addFav} />
      </Route>
      <Route path="/favorites">
        <Favorites
          // handleUser={handleUserChange}
          // updateUser={updateUser}
          deleteUser={deleteUser}
          locations={locations}
          addFav={addFav}
          favorites={favorites}
          deleteFav={deleteFav}
          userSignedIn={userSignedIn}
        />
      </Route>
      <Route path="/PROFILE">
        <Profile
          giveUpdatedUser={getUpdatedUser}
          userSignedIn={userSignedIn}
          handleChange={handleChange}
          deleteUser={deleteUser}
        />
      </Route>
    </Switch>
  );
}

export default AuthenticatedApp;
