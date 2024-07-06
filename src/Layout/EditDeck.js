import React, {useEffect} from "react";
import { useState } from "react"
import {Link, useNavigate, useParams} from "react-router-dom";
import {createCard, readDeck, updateCard, updateDeck} from "../utils/api";
import deck from "./Deck";
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
            <Breadcrumbs deckName={deck.name} />
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Name:
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Deck name"
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
                        placeholder="Brief description of the deck"
                        required={true}
                        onChange={handleDescriptionChange}
                        value={description}
                    />
                </label>
                <Link to={`/decks/${params.deckId}`}>
                    <button>Cancel</button>
                </Link>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default EditDeck;
