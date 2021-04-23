import { Route } from "react-router-dom";
import HomePage from "./Components/MainPage/HomePage";

function UnAuthenticatedApp({ siteCoords, userSignedIn }) {
  return (
    <Route path="*">
      <HomePage signedIn={userSignedIn.signedIn} />
    </Route>
  );
}

export default UnAuthenticatedApp;
