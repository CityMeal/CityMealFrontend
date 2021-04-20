import React from 'react';
import Forms from './FormModal';
import List from '../ListComponent/List';
import Announcement from '../Others/announce';

function ListView(props) {

  return (
    <div className="welcome">
      <Announcement />
      <List locations={props.locations} />
{/*       
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

      /> */}
    </div>
  );
}

export default ListView;
