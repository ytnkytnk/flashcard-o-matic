import React from "react";
import { useParams } from "react-router-dom";

function Deck({ deckCards, currentDeck }) {
  console.log("deckcard:", deckCards);
  // console.log("currentDeck:", currentDeck);

  const { deckId } = useParams();

  const cards = deckCards.filter(
    (deckCard) => deckCard.deckId === Number(deckId)
  );
  // console.log("cards:", cards);

  return (
    <div>
      <h1>[TODO] Current Deck Card</h1>
      <hr />
      <h1>Deck Cards</h1>
      {cards.map((card) => (
        <div className="deck-card-contents">
          <div className="card-text-contents">
            <p className="left-column">{card.front}</p>
            <p className="right-column">{card.back}</p>
          </div>
          <div className="right-edge-buttons">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deck;
