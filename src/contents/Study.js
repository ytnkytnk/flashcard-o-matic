import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState("");
  const [currentCardId, setCurrentCardId] = useState("1");
  const [isFlipped, setIsFlipped] = useState(false);

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

  const cards = deck.cards.filter((card) => card.deckId === Number(deckId));
  //   console.log(cards);

  // if there are more than 3 cards, return flashcard #1
  // if not, show 'Not enough cards' message with 'Add Cards' button

  if (deck.cards.length < 3) {
    return (
      <div>
        <h1>{deck.name}: Study</h1>
        <h2>Not enough cards</h2>
        <p>
          You need at least 3 cards to study. There are {deck.cards.length}{" "}
          cards in this deck.
        </p>
        <button
          onClick={() => {
            navigate(`/decks/${deck.id}/cards/new`);
          }}
        >
          + Add Cards
        </button>
      </div>
    );
  }

  // if reach to the end of the cards, show the message
  return (
    <div>
      <h1>{deck.name}: Study</h1>
      <div className="single-card-contents">
        <h3>
          Card {currentCardId} of {cards.length}
        </h3>
        {!isFlipped ? (
          <p>{cards[currentCardId - 1].front}</p>
        ) : (
          <p>{cards[currentCardId - 1].back}</p>
        )}
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            setIsFlipped(!isFlipped);
          }}
        >
          Flip
        </button>
        {!isFlipped ? null : (
          <button
            style={{
              border: "solid 1px blue",
              color: "white",
              "background-color": "blue",
            }}
            onClick={() => {
              setCurrentCardId(Number(currentCardId) + 1);
              setIsFlipped(!isFlipped);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Study;
