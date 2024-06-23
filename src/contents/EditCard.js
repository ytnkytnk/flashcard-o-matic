import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck, updateCard } from "../utils/api";

function EditCard() {
  const navigate = useNavigate();

  // get current deck data
  const { deckId, cardId } = useParams();

  const [deck, setDeck] = useState({});

  // handle forms
  const initialFormState = {
    deckId: deckId,
    front: "",
    back: "",
    id: cardId,
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  useEffect(() => {
    async function fetchDeck() {
      try {
        const response = await readDeck(deckId);
        setDeck(response);

        const card = response.cards.find((card) => card.id === Number(cardId));
        if (card) {
          setFormData({
            id: Number(cardId),
            front: card.front,
            back: card.back,
            deckId: Number(deckId),
          });
        }
      } catch (error) {
        throw error;
      }
    }
    fetchDeck();
  }, [deckId, cardId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      await updateCard(formData, signal);

      event.target.reset();

      navigate(`/decks/${deckId}/`);
      window.location.reload();
    } catch (error) {
      console.error("Error editing card", error);
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 id="content-title">Edit Card</h1>
      <label>Front</label>
      <form onSubmit={handleSubmit}>
        <textarea
          style={{ width: "100%", height: "150px" }}
          type="text"
          id="front"
          name="front"
          value={formData.front}
          onChange={handleChange}
        ></textarea>
        <label>Back</label>
        <textarea
          style={{ width: "100%", height: "150px" }}
          type="text"
          id="back"
          name="back"
          value={formData.back}
          onChange={handleChange}
        ></textarea>
        <button onClick={() => navigate(`/decks/${deckId}`)}>Cancel</button>
        <input className="action-buttons" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default EditCard;
