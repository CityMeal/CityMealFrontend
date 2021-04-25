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
    updateUser,
    handleChange,
    deleteUser,
    favorites,
    deleteFav,
  } = props;

  console.log(locations)

  return (
    <Switch>
      <Route path="/home">
        <HomePage signedIn={userSignedIn.signedIn} />
      </Route>
      <Route path="/list">
        <ListView locations={locations} addFav={addFav} />
      </Route>
      <Route path="/favorites">
        <Favorites
          handleUser={handleChange}
          updateUser={updateUser}
          deleteUser={deleteUser}
          locations={locations}
          addFav={addFav}
          favorites={favorites}
          deleteFav={deleteFav}
          userSignedIn={userSignedIn}
        />
      </Route>
      <Route path="/profile">
        <Profile
          userSignedIn={userSignedIn}
          updateUser={updateUser}
          handleChange={handleChange}
          deleteUser={deleteUser}
        />
      </Route>
    </Switch>
  );
}

export default AuthenticatedApp;
