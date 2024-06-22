import React from "react";
import { useNavigate } from "react-router-dom";

function DeckList({ decks, setCurrentDeck }) {
  const navigate = useNavigate();

  return (
    <div>
      <button
        style={{ width: "150px", height: "30px" }}
        onClick={() => {
          navigate(`/decks/new`);
        }}
      >
        + Create Deck
      </button>
      {/* <h1>Deck List</h1> */}
      {decks.map((deck) => (
        <div key={deck.id} className="deck-contents">
          <h2>{deck.name}</h2>
          <p>{deck.description}</p>
          <div className="button-container">
            <div className="left-edge-buttons">
              <button
                id={deck.id}
                onClick={() => {
                  setCurrentDeck(deck.id);
                  navigate(`/decks/${deck.id}`);
                }}
              >
                View
              </button>
              <button
                onClick={() => {
                  navigate(`/decks/${deck.id}/study`);
                }}
              >
                Study
              </button>
            </div>
            <div className="right-edge-buttons">
              <button className="right-edge-buttons">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DeckList;
