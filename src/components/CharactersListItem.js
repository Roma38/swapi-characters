import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { List } from "semantic-ui-react";

import { toggleFavorite } from "../redux/actions/heroes";

function CharactersListItem({ hero }) {
  const [homeworld, setHomeworld] = useState(null);
  const dispatch = useDispatch();
  const { favorite } = useSelector(state => state.heroes);

  useEffect(() => {
    axios
      .get(hero.homeworld)
      .then(({ data }) => setHomeworld(data.name))
      .catch(error => console.log(error));
  }, [hero.homeworld]);

  return <List.Item>
    <List.Icon className="like-icon" 
      onClick={() => dispatch(toggleFavorite(hero.url))}
      name={favorite.includes(hero.url) ? 'heart' : 'heart outline'}
      size="large" 
    />

    <List.Content>
      <List.Header as={Link} to={`/profile/${hero.url.split("/")[5]}`}>{hero.name}</List.Header>
      Gender: {hero.gender} <br />
      HomePlanet: {homeworld}
    </List.Content>
  </List.Item>
}

export default CharactersListItem;
