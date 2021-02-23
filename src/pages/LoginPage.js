import { useDispatch } from "react-redux";
import { Header, Segment, Grid, Divider, Icon } from "semantic-ui-react";

import SocialButton from '../components/SocialButton';

import { FACEBOOK_APP_ID, LINKEDIN_APP_ID } from "../constants";
import { storeUserData } from "../redux/actions/user";


function LoginPage() {
  const dispatch = useDispatch();

  const handleSocialLogin = user => {
    dispatch(storeUserData(user));
  }

  const handleSocialLoginFailure = err => {
    console.log(err);
    alert('Oops, something went wrong :(');
  }

  return <Segment placeholder>
    <Grid columns={2} stackable textAlign='center'>
      <Divider vertical>Or</Divider>

      <Grid.Row verticalAlign='middle'>
        <Grid.Column>
          <Header icon as={SocialButton}
            provider='facebook'
            appId={FACEBOOK_APP_ID}
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
            className="login-btn"
          >
            <Icon name='facebook' color='blue' /> Facebook
          </Header>
        </Grid.Column>
        <Grid.Column>
          <Header icon as={SocialButton}
            provider='linkedin'
            appId={LINKEDIN_APP_ID}
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={() => alert('Sorry, authorization via LinkedIn not implemented yet :(')}
            className="login-btn"
          >
            <Icon name='linkedin' color='blue' /> LinkedIn
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
}

export default LoginPage;
