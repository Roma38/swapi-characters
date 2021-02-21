import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dimmer, Loader, Message, List, Pagination } from "semantic-ui-react";

import CharactersListItem from "../components/CharactersListItem";

import { getHeroes } from "../redux/actions/heroes";


function HomePage() {
  const heroes = useSelector(state => state.heroes);
  const [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHeroes(activePage));
  }, [activePage, dispatch]);

  return <div>
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
      <List>
        {heroes.items.results.map(hero => <CharactersListItem hero={hero} key={hero.name} />)}
      </List>
      <Pagination
        activePage={activePage}
        onPageChange={(e, { activePage }) => setActivePage(activePage)}
        size='mini'
        // boundaryRange={0}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={Math.ceil(heroes.items.count / 10)}
      />
    </>}
  </div>
}

export default HomePage;
