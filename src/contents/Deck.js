import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

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

  async function handleDeleteDeck(deckId) {
    const controller = new AbortController();
    const signal = controller.signal;

    if (
      window.confirm(
        `Delete this deck?\r\n\r\nYou will not be able to recover it.`
      )
    ) {
      try {
        await deleteDeck(deckId, signal);
        navigate("/");
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  }

  async function handleDeleteCard(cardId) {
    const controller = new AbortController();
    const signal = controller.signal;

    if (
      window.confirm(
        `Delete this card?\r\n\r\nYou will not be able to recover it.`
      )
    ) {
      try {
        await deleteCard(cardId, signal);
        // Refresh the deck data after deleting a card
        const updatedDeck = await readDeck(deckId);
        setDeck(updatedDeck);
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    }
  }

  const deckTitle = deck.name;

  return (
    <div>
      <div className="current-deck-contents">
        {/* <h2>{deck.name}</h2> */}
        <h2>{deckTitle}</h2>
        <p>{deck.description}</p>
        <div className="flex-row-space-between">
          <div>
            <button
              onClick={() => {
                navigate(`edit`);
              }}
            >
              Edit
            </button>
            <button
              className="action-buttons"
              onClick={() => {
                navigate(`study`);
              }}
            >
              Study
            </button>
            <button
              className="action-buttons"
              onClick={() => {
                navigate(`cards/new`);
              }}
            >
              + Add Cards
            </button>
          </div>
          <button
            className="delete-button"
            onClick={() => handleDeleteDeck(deck.id)}
          >
            Delete
          </button>
        </div>
      </div>
      <hr />
      <h1>Cards</h1>
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
                // console.log(card.id);
                navigate(`cards/${card.id}/edit`);
              }}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => handleDeleteCard(card.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deck;
