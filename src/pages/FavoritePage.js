import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dimmer, Loader, List, Pagination, Button, Icon } from "semantic-ui-react";

import CharactersListItem from "../components/CharactersListItem";
import { fetchData } from "../utils";
import { ITEMS_PER_PAGE } from "../constants";

function FavoritePage() {
  const [heroes, setHeroes] = useState(null);
  const { favorite } = useSelector(state => state.heroes);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    Promise.all(favorite.map(url => fetchData(url)))
      .then(data => setHeroes(data));
  }, [favorite]);

  return heroes ?
    <>
      <nav className="navigation">
        <Button as={Link} to="/" animated>
          <Button.Content visible>Back</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow left' />
          </Button.Content>
        </Button>
      </nav>
      <List divided>
        {heroes.slice(activePage * ITEMS_PER_PAGE - 10, activePage * ITEMS_PER_PAGE)
          .map(hero => <CharactersListItem hero={hero} key={hero.name} />)}
      </List>
      <div className="pagination-wrapper">
        <Pagination
          activePage={activePage}
          onPageChange={(e, { activePage }) => setActivePage(activePage)}
          size='mini'
          // boundaryRange={0}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={Math.ceil(heroes.length / ITEMS_PER_PAGE)}
        />
      </div>
    </> :
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
}

export default FavoritePage;
