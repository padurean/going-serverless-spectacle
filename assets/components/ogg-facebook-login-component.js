import React, { PropTypes } from 'react';
import objectToParams from './objectToParams';

class OggFacebookLoginComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { appId, xfbml, cookie, version, autoLoad, language } = this.props;
    let fbRoot = document.getElementById('fb-root');

    if (!fbRoot) {
      fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';

      document.body.appendChild(fbRoot);
    }

    window.fbAsyncInit = () => {
      window.FB.init({
        version: `v${version}`,
        appId,
        xfbml,
        cookie,
      });

      if (autoLoad || window.location.search.includes('facebookdirect')) {
        window.FB.getLoginStatus(this.checkLoginState.bind(this));
      }
    };
    // Load the SDK asynchronously
    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = `//connect.facebook.net/${language}/all.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  responseApi(authResponse) {
    window.FB.api('/me', { fields: this.props.fields }, (me) => {
      Object.assign(me, authResponse);
      this.props.callback(me);
    });
  };

  checkLoginState(response) {
    if (response.authResponse) {
      this.responseApi(response.authResponse);
      console.log('FB response: ', response);
      if (response.status==='connected') {
        this.props.handleSetState({loggedIn: true});
        console.log('State after successful login: ', this.props.handleGetState());
      } else {
        this.props.handleSetState({loggedIn: false});
        if (this.props.callback) {
          this.props.callback({ status: response.status });
        }
        console.log('State after checkLoginState failed: ', this.props.handleGetState());
      }
    } else {
      if (this.props.callback) {
        this.props.callback({ status: response.status });
      }
      console.log('State after checkLoginState failed: ', this.props.handleGetState());
    }
  };

  clickLogout() {
    let self = this;
    window.FB.logout(function(response) {
      console.log('Logout response: ', response);
      self.props.handleSetState({loggedIn: false});
      console.log('State after logout: ', self.props.handleGetState());
    });
  }

  click() {
    const { scope, appId, onClick, reAuthenticate } = this.props;

    if (typeof onClick === 'function') {
      onClick();
    }

    let isMobile = false;

    try {
      isMobile = ((window.navigator && window.navigator.standalone) || navigator.userAgent.match('CriOS') || navigator.userAgent.match(/mobile/i));
    } catch (ex) {
      // continue regardless of error
    }

    const params = {
      client_id: appId,
      redirect_uri: window.location.href,
      state: 'facebookdirect',
      scope,
    };

    if (reAuthenticate) {
      params.auth_type = 'reauthenticate';
    }

    if (isMobile) {
      window.location.href = `https://www.facebook.com/dialog/oauth?${objectToParams(params)}`;
    } else {
      window.FB.login(this.checkLoginState.bind(this), { scope, auth_type: params.auth_type });
    }
  };

  render() {
    const { cssClass, size, icon, textButton, textButtonLoggedIn } = this.props;
    const isIconString = typeof icon === 'string';

      if (!this.props.handleGetState() || !this.props.handleGetState().loggedIn) return (
        <span>
          {isIconString && (
            <link
              rel="stylesheet"
              href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
            />
          )}
          <button
            className={`${cssClass} ${size}`}
            onClick={this.click.bind(this)}
            style={{fontSize: '1.25rem', color: '#fff', backgroundColor: '#3b5998'}}
          >
            {icon && isIconString && (
              <i className={`fa ${icon}`}></i>
            )}
            {icon && !isIconString && icon}
            {textButton}
          </button>
        </span>
      );
      else return (
        <span>
          {isIconString && (
            <link
              rel="stylesheet"
              href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
            />
          )}
          <button
            className={`${cssClass} ${size}`}
            onClick={this.clickLogout.bind(this)}
            style={{fontSize: '1.25rem', color: '#fff', backgroundColor: '#3b5998'}}
          >
            {icon && isIconString && (
              <i className={`fa ${icon}`}></i>
            )}
            {icon && !isIconString && icon}
            {textButtonLoggedIn}
          </button>
        </span>
      );
  }
}

OggFacebookLoginComponent.propTypes = {
  callback: PropTypes.func.isRequired,
  appId: PropTypes.string.isRequired,
  xfbml: PropTypes.bool,
  cookie: PropTypes.bool,
  reAuthenticate: PropTypes.bool,
  scope: PropTypes.string,
  textButton: PropTypes.string,
  textButtonLoggedIn: PropTypes.string,
  typeButton: PropTypes.string,
  autoLoad: PropTypes.bool,
  size: PropTypes.string,
  fields: PropTypes.string,
  cssClass: PropTypes.string,
  version: PropTypes.string,
  icon: PropTypes.any,
  language: PropTypes.string,
  onClick: PropTypes.func,
  handleSetState: PropTypes.func.isRequired,
  handleGetState: PropTypes.func.isRequired
};

OggFacebookLoginComponent.defaultProps = {
  textButton: 'Login with Facebook',
  textButtonLoggedIn: 'Logout from Facebook',
  typeButton: 'button',
  scope: 'public_profile,email',
  xfbml: false,
  cookie: false,
  reAuthenticate: false,
  size: 'metro',
  fields: 'name',
  cssClass: 'kep-login-facebook',
  version: '2.3',
  language: 'en_US',
};

export default OggFacebookLoginComponent;
