import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readDeck, updateDeck, createDeck } from "../utils/api";
import Breadcrumbs from "./Breadcrumbs";

function DeckForm({ isEditMode = false }) {
    const params = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [deck, setDeck] = useState({});
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();

        try {
            if (isEditMode) {
                const updatedDeck = await updateDeck(
                    {
                        ...deck,
                        description,
                        name,
                    },
                    abortController.signal
                );
                setDeck(updatedDeck);
                navigate(`/decks/${params.deckId}`);
            } else {
                const newDeck = await createDeck(
                    { name, description },
                    abortController.signal
                );
                setName("");
                setDescription("");
                navigate(`/decks/${newDeck.id}`);
            }
        } catch (error) {
            console.error(`Error ${isEditMode ? "updating" : "creating"} deck:`, error);
        }
    };

    useEffect(() => {
        const fetchDeck = async () => {
            if (isEditMode) {
                const abortController = new AbortController();
                const deck = await readDeck(params.deckId, abortController.signal);
                setName(deck.name);
                setDescription(deck.description);
                setDeck(deck);
            }
        };
        fetchDeck();
    }, [isEditMode, params.deckId]);

    const title = isEditMode ? "Edit Deck" : "Create Deck";
    const cancelLink = isEditMode ? `/decks/${params.deckId}` : "/";

    return (
        <div>
            <Breadcrumbs deckName={isEditMode ? deck.name : null} />
            <h1>{title}</h1>
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
                    <Link to={cancelLink} className="btn btn-secondary">
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

export default DeckForm;
