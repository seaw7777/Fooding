import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function (SpecificComponent, option) {
  function AuthenticationCheck(props) {
    let user = useSelector(state => state.user);
    let isAuth = localStorage.getItem('token');

    //Not Loggined in Status
    if (isAuth === null) {
      if (option) {
        props.history.push('/login');
      }
      //Loggined in Status
    } else {
      if (option === false) {
        props.history.push('/main');
      }
    }

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
