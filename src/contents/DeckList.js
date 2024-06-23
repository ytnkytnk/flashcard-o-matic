import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import data from "../data/db.json";

function DeckList() {
  const navigate = useNavigate();

  function handleDelete(deckId) {
    const controller = new AbortController();
    const signal = controller.signal;

    if (
      window.confirm(
        `Delete this deck?\r\n\r\nYou will not be able to recover it.`
      )
    ) {
      // yes clicked >> delete
      deleteDeck(deckId, signal);
      navigate(`/`);
    } else {
      // cancel clicked >> go to Home
      navigate(`/`);
    }
  }

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

        return (
          <div key={deck.id} className="deck-contents">
            <div className="flex-row-space-between">
              <h2>Mock {deck.name}</h2>
              <p>{cardCount} cards</p>
            </div>
            <p>{deck.description}</p>
            <div className="flex-row-space-between">
              <div>
                <button
                  id={deck.id}
                  onClick={() => {
                    navigate(`/decks/${deck.id}`);
                  }}
                >
                  View
                </button>
                <button
                  className="action-buttons"
                  onClick={() => {
                    navigate(`/decks/${deck.id}/study`);
                  }}
                >
                  Study
                </button>
              </div>
              <div>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(deck.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DeckList;
