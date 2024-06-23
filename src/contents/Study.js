import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState("");
  const [currentCardId, setCurrentCardId] = useState(1);
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

  // add Loading for pending case
  if (!deck) {
    return <div>Loading...</div>;
  }

  const cards = deck.cards.filter((card) => card.deckId === Number(deckId));
  //   console.log("cards:", cards);

  // if there are more than 3 cards, return flashcard #1
  // if not, show 'Not enough cards' message with 'Add Cards' button

  if (deck.cards.length < 3) {
    return (
      <div>
        <h1>Study: {deck.name}</h1>
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
  function handleLastCard() {
    if (
      window.confirm(
        `Restart cards?\r\n\r\nClick 'cancel' to return to the home page.`
      )
    ) {
      // yes clicked >> restart cards
      setCurrentCardId(1);
      navigate(`/decks/${deck.id}/study`);
    } else {
      // cancel clicked >> go to Home
      navigate(`/`);
    }
  }

  return (
    <div>
      <h1>Study: {deck.name}</h1>
      <div className="single-card-contents">
        <h3>
          Card {currentCardId} of {cards.length}
        </h3>
        {cards
          .filter((card) => card.id === currentCardId)
          .map((card) =>
            !isFlipped ? <p>{card.front}</p> : <p>{card.back}</p>
          )}
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
                backgroundColor: "blue",
              }}
              onClick={() => {
                setCurrentCardId(currentCardId + 1);
                setIsFlipped(!isFlipped);
                if (currentCardId === deck.cards.length) handleLastCard();
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Study;
