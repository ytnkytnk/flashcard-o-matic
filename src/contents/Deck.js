import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function Deck() {
  const navigate = useNavigate();
  const { deckId } = useParams();

  const [deck, setDeck] = useState("");

  useEffect(() => {
    async function fetchDeck() {
      try {
        const response = await readDeck(deckId);
        setDeck(response);
      } catch (error) {
        throw error;
      }
    }
    fetchDeck();
  }, [deckId]);

  if (!deck) {
    return <div>Loading...</div>;
  }

  const cards = deck.cards;

  return (
    <div>
      <div className="current-deck-contents">
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <div className="flex-content-row">
          <div className="left-deck-buttons">
            <button
              onClick={() => {
                navigate(`edit`);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                navigate(`study`);
              }}
            >
              Study
            </button>
            <button
              onClick={() => {
                navigate(`cards/new`);
              }}
            >
              + Add Cards
            </button>
          </div>
          <button className="right-edge-buttons">Delete</button>
        </div>
      </div>
      <hr />
      <h1>Deck Cards</h1>
      {cards.map((card) => (
        <div className="deck-card-contents">
          <div className="card-text-contents">
            <p className="left-column">{card.front}</p>
            <p className="right-column">{card.back}</p>
          </div>
          <div className="right-edge-buttons">
            <button
              id={card.id}
              onClick={() => {
                console.log(card.id);
                navigate(`cards/${card.id}/edit`);
              }}
            >
              Edit
            </button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deck;
