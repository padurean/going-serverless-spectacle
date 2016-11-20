import React, { Component, PropTypes } from "react";
import OggFacebookLoginComponent from './ogg-facebook-login-component';
import IoSocialFacebook from 'react-icons/lib/io/social-facebook';

import apigClientFactory from 'aws-api-gateway-client';

export default class OggFacebookLogin extends Component {
  constructor(props) {
    super(props);
  }

  // START config
  static apiGatewayUrl() {
    return 'https://61fwzz4gwb.execute-api.eu-west-1.amazonaws.com/prod';
  }
  static awsRegion() {
    return 'eu-west-1';
  }
  static awsIdentityPoolId() {
    return 'eu-west-1:83dbe19a-4413-454f-a112-c2620083ee92';
  }
  // END config

  render() {
    const iconStyle = {
      padding: "0 0 3px 0",
      margin: "0 5px 0 0",
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
            icon={<IoSocialFacebook size={32} style={iconStyle} />}
            size="small" />
        </div>
      );
  }

  responseFacebook(response) {
    this.loginToAws(response);
  }

  loginToAws(loginData) {
    console.log('loginToAws called with loginData:', loginData);
    if (loginData.connected) {
      // Add the Facebook access token to the Cognito credentials login map.
      AWS.config.region = OggFacebookLogin.awsRegion();
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: OggFacebookLogin.awsIdentityPoolId(),
        Logins: {
          'graph.facebook.com': loginData.accessToken
        },
        LoginId: loginData.email
      });

      this.loginToAwsAndExecute(function(){
        // Access AWS resources here.
        console.log('AWS credentials after AWS login: ', AWS.config.credentials);
        const apigClient = apigClientFactory.newClient({
          invokeUrl: OggFacebookLogin.apiGatewayUrl(),
          accessKey: AWS.config.credentials.accessKeyId,
          secretKey: AWS.config.credentials.secretAccessKey,
          sessionToken: AWS.config.credentials.sessionToken, //OPTIONAL: If you are using temporary credentials you must include the session token
          region: AWS.config.region // OPTIONAL: The region where the API is deployed, by default this parameter is set to us-east-1
        });

        apigClient.invokeApi('{}', '/', 'GET', '{}', '{}')
          .then(function(result) {
            console.log('Invoke api response:', result);
          })
          .catch(function(err) {
            console.error('Invoke api failed:', err);
          });

      });
    } else {
      console.warn('AWS login not initiated - (pre)login by identity provider (i.e. probably Facebook) has apparently failed.');
    }
  }

  loginToAwsAndExecute(someAction) {
    // Obtain AWS credentials
    AWS.config.credentials.get(function (err) {
      if (err) {
        console.error("Unable to retrieve AWS credentials: " + err);
      } else {
        //console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);
        // User is already signed in to AWS - proceeding to execution ...
        someAction();
      }
    });
  }
}

OggFacebookLogin.propTypes = {
  handleSetState: PropTypes.func.isRequired,
  handleGetState: PropTypes.func.isRequired
};
