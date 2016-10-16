import React, { Component, PropTypes } from "react";
import OggFacebookLoginComponent from './ogg-facebook-login-component';
import IoSocialFacebook from 'react-icons/lib/io/social-facebook';

export default class OggFacebookLogin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const iconStyle = {
      padding: "0 0 .25rem 0",
      margin: "0 .5rem 0 0"
    };
      // console.log('In render this: ', this);
      // console.log('In render state: ', this.state);
      return (
        <div id="fb-login-btn-wrapper" style={this.props.style}>
          <OggFacebookLoginComponent
            appId="688661967935072"
            autoLoad={true}
            reAuthenticate={false}
            cookie={true}
            fields="name,email,picture"
            callback={this.responseFacebook.bind(this)}
            handleSetState={this.props.handleSetState}
            handleGetState={this.props.handleGetState}
            icon={<IoSocialFacebook size={24} style={iconStyle} />}
            size="small" />
        </div>
      );
  }

  responseFacebook(response) {
    // console.log('Response from facebook: ', response);
    // console.log('in response Facebook this: ', this);
  };
}

OggFacebookLogin.propTypes = {
  handleSetState: PropTypes.func.isRequired,
  handleGetState: PropTypes.func.isRequired
};
