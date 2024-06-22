import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

function AddCard() {
  const navigate = useNavigate();

  // get current deck data
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

  // handle forms
  const initialFormState = {
    deckId: deckId,
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
    // console.log("handling changes........");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const controller = new AbortController();
    const signal = controller.signal;

    createCard(deckId, formData, signal);

    // clear form values
    event.target.reset();

    // process for adding a card is restarted
    navigate(`/decks/${deckId}/cards/new`);
  };

  if (!deck) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Add Card</h1>
      <h2>{deck.name}</h2>
      <label>Front</label>
      <form onSubmit={handleSubmit}>
        <textarea
          style={{ width: "100%", height: "150px" }}
          type="text"
          id="front"
          name="front"
          placeholder="Front side of card"
          onChange={handleChange}
        ></textarea>
        <label>Back</label>
        <textarea
          style={{ width: "100%", height: "150px" }}
          type="text"
          id="back"
          name="back"
          placeholder="Back side of card"
          onChange={handleChange}
        ></textarea>
        <button onClick={() => navigate(`/decks/${deckId}`)}>Done</button>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}

export default AddCard;
