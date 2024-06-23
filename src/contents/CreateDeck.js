import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const navigate = useNavigate();

  const initialFormState = {};

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newDeck = await createDeck(formData);
      navigate(`/decks/${newDeck.id}`);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  return (
    <div>
      <h1 id="content-title">Create Deck</h1>
      <label>Name</label>
      <form>
        <input
          style={{ width: "100%" }}
          type="text"
          id="name"
          name="name"
          placeholder="Deck Name"
          onChange={handleChange}
        ></input>
        <label>Description</label>
        <textarea
          style={{ width: "100%", height: "150px" }}
          type="text"
          id="description"
          name="description"
          placeholder="Brief description of the deck"
          onChange={handleChange}
        ></textarea>
        <button onClick={() => navigate(`/`)}>Cancel</button>
        <button onClick={handleSubmit} className="action-buttons">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
