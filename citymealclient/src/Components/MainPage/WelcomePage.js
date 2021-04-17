import React from 'react';
import Forms from './FormModal'
import List from '../ListPage/List'


function Welcome(props) {

  return (
    <div className="welcome">

      {/* <List locations={props.locations}/> */}

      <Forms 
        formLabels={props.labels}
        modalOpen={props.modalOpen}
        modalClose={props.modalClose}
        valueChange={props.valueChange}
        // loginChange={props.logInChange}
        userVals={props.userVal}
        loginVals={props.loginVal}
        onSubmitUserDetails={props.onSubmitUser}
        onSubmitLoginDetails={props.onSubmitLogIn}
      
      />
    </div>
  );
}

export default Welcome;
