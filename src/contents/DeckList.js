import React from "react";
import { useNavigate } from "react-router-dom";
import data from "../data/db.json";

function DeckList() {
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
      {data.decks.map((deck) => {
        const cardCount = data.cards.filter(
          (card) => card.deckId === deck.id
        ).length;
        const deckName = deck.name;

        return (
          <div key={deck.id} className="deck-contents">
            <div className="flex-row-space-between">
              <h2>{deckName}</h2>
              <p>{cardCount} cards</p>
            </div>
            <p>{deck.description}</p>
            <div className="button-container">
              <div className="left-edge-buttons">
                <button
                  id={deck.id}
                  onClick={() => {
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
        );
      })}
    </div>
  );
}

export default DeckList;
