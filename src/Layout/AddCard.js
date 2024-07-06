import React, {useEffect} from "react";
import { useState } from "react"
import {Link, useParams} from "react-router-dom";
import {createCard, readDeck} from "../utils/api";
import Breadcrumbs from "./Breadcrumbs";

function AddCard({addNewCard}) {
    const [deck, setDeck] = useState({})
    const [cards, setCards] = useState([])
    const params = useParams();
    const [front, setFront] = useState("")
    const [back, setBack] = useState("")


    useEffect(() => {
        const fetchDeck = async () => {
            const abortController = new AbortController();
            const deck = await readDeck(params.deckId, abortController.signal)
            console.log(deck)
            setDeck(deck)
            setCards(deck.cards)
        }
        fetchDeck();
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault(); // prevent default submit behavior
        addNewCard(params.deckId, {front: front, back: back})

        // clear entered data
        setFront("");
        setBack("");
    };

    const handleFrontChange = (event) => setFront(event.target.value);
    const handleBackChange = (event) => setBack(event.target.value);

    return (
        <div>
            <Breadcrumbs deckName={deck.name}/>
            <h1>{deck.name}</h1>
            <h2>Add Card</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label htmlFor="front" className="form-label">
                        Front:
                    </label>
                    <textarea
                        id="front"
                        name="front"
                        required={true}
                        placeholder="Front side of card"
                        onChange={handleFrontChange}
                        value={front}
                        className="form-control"
                        rows="3"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="back" className="form-label">
                        Back:
                    </label>
                    <textarea
                        id="back"
                        name="back"
                        required={true}
                        placeholder="Back side of card"
                        onChange={handleBackChange}
                        value={back}
                        className="form-control"
                        rows="3"
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
                        Done
                    </Link>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCard;
