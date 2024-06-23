import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState({ name: "", description: "" });

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

  const handleChange = ({ target }) => {
    setDeck((prevDeck) => ({
      ...prevDeck,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const controller = new AbortController();
    const signal = controller.signal;

    updateDeck(deck, signal);

    navigate(`/`);
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Deck</h1>
      <label>Name</label>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: "100%" }}
          type="text"
          id="name"
          name="name"
          value={deck.name}
          onChange={handleChange}
        ></input>
        <label>Description</label>
        <textarea
          style={{ width: "100%", height: "150px" }}
          type="text"
          id="description"
          name="description"
          value={deck.description}
          onChange={handleChange}
        ></textarea>
        <button onClick={() => navigate(`/`)}>Cancel</button>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default EditDeck;
