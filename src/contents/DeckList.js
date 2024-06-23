import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function DeckList() {
  const navigate = useNavigate();

  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDecks = async () => {
      const loadedDecks = await listDecks();
      setDecks(loadedDecks);
      setIsLoading(false);
    };
    loadDecks();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        window.location.reload();
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
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
      {decks &&
        decks.map((deck) => {
          return (
            <div key={deck.id} className="deck-contents">
              <div className="flex-row-space-between">
                <h2>{deck.name}</h2>
                <span>{deck.cards.length} cards</span>
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
                    onClick={() => handleDeleteDeck(deck.id)}
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
