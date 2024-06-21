import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data/db.json";
import { createDeck } from "../utils/api";

function CreateNew() {
  const navigate = useNavigate();

  // get current decks length for assigning the new deckId
  const deckLen = data.decks.length;

  // useState
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const controller = new AbortController();
    const signal = controller.signal;

    const deck = {};
    createDeck(deck, signal);
    // navigate(`/decks/${deckLen + 1}`);
  };

  return (
    <div>
      <h1>Create Deck</h1>
      <label>Name</label>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: "100%" }}
          type="text"
          id="name"
          name="name"
          placeholder="Deck Name"
        ></input>
        <label>Description</label>
        <textarea
          style={{ width: "100%", height: "150px" }}
          type="text"
          id="description"
          name="description"
          placeholder="Brief description of the deck"
        ></textarea>
        <button onClick={() => navigate(`/`)}>Cancel</button>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default CreateNew;
