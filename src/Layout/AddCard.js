import React, {useEffect} from "react";
import { useState } from "react"
import {Link, useParams} from "react-router-dom";
import {createCard, readDeck} from "../utils/api";

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
            <h1>{deck.name}</h1>
            <h2>Add Card</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="front">
                    Front:
                    <textarea
                        id="front"
                        name="front"
                        required={true}
                        onChange={handleFrontChange}
                        value={front}
                    />
                </label>
                <label htmlFor="back">
                    Back:
                    <textarea
                        id="back"
                        name="back"
                        required={true}
                        onChange={handleBackChange}
                        value={back}
                    />
                </label>
                <Link to={`/decks/${deck.id}`}>
                    <button>Done</button>
                </Link>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default AddCard;
