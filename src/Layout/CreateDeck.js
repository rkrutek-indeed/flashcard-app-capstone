import React from "react";
import { useState } from "react"
import {Link, useNavigate} from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import {createDeck} from "../utils/api";

function CreateDeck() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevent default submit behavior
        const abortController = new AbortController();
        try {
            const newDeck = await createDeck({ name, description }, abortController.signal);
            setName("");
            setDescription("");
            navigate(`/decks/${newDeck.id}`);
        } catch (error) {
            console.error("Error creating deck:", error);
        }
    };

    return (
      <div>
          <Breadcrumbs />
          <h1>Create Deck</h1>
          <form onSubmit={handleSubmit}>
              <label htmlFor="name">
                  Name:
                  <input
                      id="name"
                      type="text"
                      name="name"
                      required={true}
                      onChange={handleNameChange}
                      value={name}
                  />
              </label>
              <label htmlFor="description">
                  Description:
                  <textarea
                      id="description"
                      name="description"
                      required={true}
                      onChange={handleDescriptionChange}
                      value={description}
                  />
              </label>
              <Link to={`/`}>
                  <button>Cancel</button>
              </Link>
              <button type="submit">Submit</button>
          </form>
      </div>
  );
}

export default CreateDeck;
