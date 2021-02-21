import { useDispatch } from "react-redux";

import SocialButton from '../components/SocialButton';

import { FACEBOOK_APP_ID } from "../constants";
import { storeUserData } from "../redux/actions/user";


function LoginPage() {
  const dispatch = useDispatch();

  const handleSocialLogin = user => {
    dispatch(storeUserData(user));
  }

  const handleSocialLoginFailure = err => {
    alert(JSON.stringify(err));
  }

  return <div className="login-page">
    <SocialButton
      provider='facebook'
      appId={FACEBOOK_APP_ID}
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >
      Login with Facebook
      </SocialButton>
  </div>
}

export default LoginPage;
