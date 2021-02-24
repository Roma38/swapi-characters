import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Dimmer, Loader, Message, List, Pagination, Button, Icon, Label } from "semantic-ui-react";

import CharactersListItem from "../components/CharactersListItem";
import CharactersSearch from "../components/CharactersSearch";

import { getHeroes } from "../redux/actions/heroes";
import { ITEMS_PER_PAGE } from "../constants";

function HomePage() {
  const heroes = useSelector(state => state.heroes);
  const [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHeroes(activePage));
  }, [activePage, dispatch]);

  return <>
    {heroes.loadingState === "loading" &&
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>}
    {heroes.loadingState === "failed" &&
      <Message negative>
        <Message.Header>Looks like, something went wrong</Message.Header>
        <p>{heroes.error}</p>
      </Message>}
    {heroes.loadingState === "succeed" && <>
      <nav className="navigation">
        <CharactersSearch />
        <Button as={Link} to="/favorite" labelPosition="right">
          <Button icon>
            <Icon name="heart" /> Liked
          </Button>
          <Label basic pointing="left">
            {heroes.favorite.length}
          </Label>
        </Button>
      </nav>
      <List divided>
        {heroes.items.results.map(hero => <CharactersListItem hero={hero} key={hero.name} />)}
      </List>
      <div className="pagination-wrapper">
        <Pagination
          activePage={activePage}
          onPageChange={(e, { activePage }) => setActivePage(activePage)}
          size="mini"
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={Math.ceil(heroes.items.count / ITEMS_PER_PAGE)}
        />
      </div>
    </>}
  </>
}

export default HomePage;
