import React from "react";
import { useState } from "react"
import {Link} from "react-router-dom";

function CreateDeck({addNewDeck}) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent default submit behavior
        addNewDeck(name, description)

        // clear entered data
        setName("");
        setDescription("");
    };

    return (
      <div>
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
