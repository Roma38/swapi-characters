import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Header, Dimmer, Loader, List, Button, Icon } from "semantic-ui-react";

import { API_HOST } from "../constants";

function fetchData(url) {
  return axios
    .get(url)
    .then(({ data }) => data)
    .catch(error => console.log(error));
}

function ProfilePage() {
  const { id } = useParams();
  const [hero, setHero] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_HOST}/people/${id}`)
      .then(({ data }) => {
        fetchData(data.homeworld)
          .then(data => setHomeworld(data.name));
        Promise.all(data.vehicles.map(url => fetchData(url)))
          .then(data => setVehicles(data));
        Promise.all(data.films.map(url => fetchData(url)))
          .then(data => setFilms(data));
        setHero(data);
      })
      .catch(error => alert(error));
  }, [id]);

  return hero ? <>
    <Header as='h1'>{hero.name}</Header>
    <p>Height: <i>{hero.height}</i></p>
    <p>Mass: <i>{hero.mass}</i></p>
    <p>Hair Color: <i>{hero.hair_color}</i></p>
    <p>Skin Color: <i>{hero.skin_color}</i></p>
    <p>Eye Color: <i>{hero.eye_color}</i></p>
    <p>Year of Birth: <i>{hero.birth_year}</i></p>
    <p>HomePlanet: <i>{homeworld}</i></p>
    <p>Vehicles (name, model):</p>
    <List>
      {vehicles.map(({ name, model, url }) => <List.Item key={url}>
        <List.Header>{model}</List.Header>
        {name}
      </List.Item>)}
    </List>
    <p>Films:</p>
    <List bulleted>
      {films.map(({ title, url }) => <List.Item key={url}>{title}</List.Item>)}
    </List>
    <Button as={Link} to="/" animated>
      <Button.Content visible>Back</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow left' />
      </Button.Content>
    </Button>
  </> :
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
}

export default ProfilePage;
