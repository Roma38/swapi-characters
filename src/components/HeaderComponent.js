import { useSelector } from "react-redux";
import { Label, Header } from "semantic-ui-react";

function HeaderComponent() {
  const { isLoggedIn, _profile } = useSelector(state => state.user);

  return <header className="app-header">
    <Header as="h2" textAlign="center" color="yellow">STAR WARS</Header>
    {isLoggedIn && <Label as="a" image className="user-label" size="medium">
      <img src={_profile.profilePicURL} alt="avatar" />
      {_profile.firstName}
    </Label>}
  </header>
}

export default HeaderComponent;