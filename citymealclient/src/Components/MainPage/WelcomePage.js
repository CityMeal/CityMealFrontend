import React from 'react';
import Forms from './FormModal'


function Welcome(props) {

  return (
    <div className="welcome">
        <Forms 
          formLabels={props.labels}
          modalOpen={props.modalOpen}
          modalClose={props.modalClose}
          userChange={props.userChange}
          loginChange={props.logInChange}
          userVals={props.userVal}
          loginVals={props.loginVal}
          onSubmitUserDetails={props.onSubmitUser}
          onSubmitLoginDetails={props.onSubmitLogIn}
        />
    </div>
  );
}

export default Welcome;
