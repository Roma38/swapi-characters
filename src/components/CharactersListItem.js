import React, { useEffect, useState } from "react";
import axios from "axios";
import { List } from "semantic-ui-react";


function CharactersListItem({ hero }) {
  const [homeworld, setHomeworld] = useState(null);
  useEffect(() => {
    axios
      .get(hero.homeworld)
      .then(({ data }) => setHomeworld(data.name))
      .catch(error => console.log(error));
  }, [hero.homeworld]);

  return <List.Item>
    <List.Header>{hero.name}</List.Header>
      Gender: {hero.gender} <br />
      {homeworld && 'HomePlanet: '+ homeworld}
  </List.Item>
}

export default CharactersListItem;
