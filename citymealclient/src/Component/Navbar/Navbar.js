import React from 'react';

function Nav(props) {
 
  ///After user signs in, update nav content
  return (
    <div className="Nav">
      {props.size > 360 ? 
        <Nav >Nav greater than screenSize</Nav> : 
        <Nav>Hello</Nav>
      }
    </div>
  );
}

export default Nav;
