import React, { Component } from "react";
import FacebookLogin from 'react-facebook-login';
import IoSocialFacebook from 'react-icons/lib/io/social-facebook';

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
    const style = {
      padding: "0 0 .25rem 0",
      margin: "0 .5rem 0 0",
    };
    return (
      <FacebookLogin
        appId="688661967935072"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        icon={<IoSocialFacebook size={24} style={style} />}
        size="small" />
    );
  }


}
