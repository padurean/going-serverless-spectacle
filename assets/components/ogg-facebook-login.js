import React, { Component } from "react";
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log(response);
};

export default class OggFacebookLogin extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    };
  }
  render() {
    return (
      <FacebookLogin
        appId="688661967935072"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook} />
    );
  }


}
