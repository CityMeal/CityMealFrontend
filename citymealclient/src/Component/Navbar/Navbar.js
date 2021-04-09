import React from 'react';
import './navbar.css'
function Nav(props) {
  console.log(props.size)
  ///After user signs in, update nav content
  return (
    <div className="Nav">
      {props.size > 360 ? 
        <div id='navish'>
          <ul>
            <li>Home</li>
            <li>Favorites</li>
            <li>List</li>
          </ul> 
        </div> : 
        <div id="dropdown">
          <select>
            <option>Home</option>
            <option>Missy</option>
            <option>Seola's View</option>
          </select>
      </div> 
           
      }
    </div>
  );
}

export default Nav;
