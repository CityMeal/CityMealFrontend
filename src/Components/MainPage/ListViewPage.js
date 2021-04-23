import React from 'react';
import List from '../ListComponent/List';
import Announcement from '../Others/announce';

function ListView(props) {

  return (
    <div className="welcome">
      <Announcement />
      <List locations={props.locations} addFav={props.addFav} />
    </div>
  );
}

export default ListView;
