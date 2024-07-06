import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {readDeck, updateDeck} from "../utils/api";
import Breadcrumbs from "./Breadcrumbs";

function EditDeck() {
    const params = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [deck, setDeck] = useState({});
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedDeck = await updateDeck({
            ...deck,
            description,
            name,
        });
        setDeck(updatedDeck);
        navigate(`/decks/${params.deckId}`);
    };

    useEffect(() => {
        const fetchDeck = async () => {
            const abortController = new AbortController();
            const deck = await readDeck(params.deckId, abortController.signal)
            setName(deck.name)
            setDescription(deck.description)
            setDeck(deck)
        }
        fetchDeck();
    }, [])

    return (
        <div>
            <Breadcrumbs deckName={deck.name}/>
            <h1>Edit Deck</h1>
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
                    <Link to={`/decks/${params.deckId}`} className="btn btn-secondary">
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

export default EditDeck;
