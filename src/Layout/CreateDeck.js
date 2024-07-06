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
            <Breadcrumbs/>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Deck name"
                        required={true}
                        onChange={handleNameChange}
                        value={name}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Brief description of the deck"
                        required={true}
                        onChange={handleDescriptionChange}
                        value={description}
                        className="form-control"
                        rows="3"
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <Link to={`/`} className="btn btn-secondary">
                        Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateDeck;
