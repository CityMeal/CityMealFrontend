import React from 'react';
import List from '../ListComponent/List';
import Announcement from '../Others/announce';

function ListView(props) {
  const {
    addFav
  } = props

  return (
    <div className="welcome">
      <Announcement />
      <List addFav={addFav} />
    </div>
  );
}

export default ListView;
