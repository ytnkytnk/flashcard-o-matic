import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Study({ decks, deckCards }) {
  const { deckId } = useParams();
  const currentDeck = decks[deckId - 1];

  const cards = deckCards.filter(
    (deckCard) => deckCard.deckId === Number(deckId)
  );
  //   console.log("cards:", cards);

  const [currentCardId, setCurrentCardId] = useState("1");

  // if there are more than 3 cards, return flashcard #1
  // if not, show 'Not enough cards' message with 'Add Cards' button
  return (
    <div>
      <h1>{currentDeck.name}: Study</h1>
      <div className="single-card-contents">
        <h3>
          Card {currentCardId} of {cards.length}
        </h3>
        <p>{cards[currentCardId - 1].front}</p>
      </div>
      <div className="buttons">
        <button>Flip</button>
      </div>
    </div>
  );
}

export default Study;
