import React from "react"
import SocialLogin from "react-social-login"

function SocialButton({ triggerLogin, children, ...restProps }) {
  return (
    <button onClick={triggerLogin} {...restProps}>
      {children}
    </button>
  );
}

export default SocialLogin(SocialButton);