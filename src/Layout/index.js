import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../contents/DeckList";
import Deck from "../contents/Deck";
import CreateNew from "../contents/CreateNew";
import Study from "../contents/Study";
import data from "../data/db.json";

function Layout() {
  const decks = data.decks;
  const deckCards = data.cards;
  // console.log(deckCards);
  const [currentDeck, setCurrentDeck] = useState(null);
  // console.log("currentDeck:", currentDeck);
  const currentDeckInfo = decks[currentDeck];
  // console.log("currentDeckInfo:", currentDeckInfo);

  return (
    <div>
      <Header />
      <Link to="/">Go Home</Link>
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Routes>
          <Route
            path="/"
            element={<DeckList decks={decks} setCurrentDeck={setCurrentDeck} />}
          />
          <Route path="/decks/">
            <Route path=":deckId" element={<Deck />} />
            <Route
              path=":deckId/study"
              element={<Study decks={decks} deckCards={deckCards} />}
            />
            {/* </Route> */}
            <Route path="new" element={<CreateNew />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
