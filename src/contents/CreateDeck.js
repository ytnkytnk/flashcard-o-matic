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
    // console.log("handling changes........");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const controller = new AbortController();
    const signal = controller.signal;

    console.log("before formData submit:", formData);
    createDeck(formData, signal);
    // setFormData({ ...initialFormState });
    console.log("formData was submitted!", formData);

    navigate(`/decks/`);
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
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default CreateDeck;
