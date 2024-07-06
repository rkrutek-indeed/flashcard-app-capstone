import React, {useEffect} from "react";
import { useState } from "react"
import {Link, useNavigate, useParams} from "react-router-dom";
import {createCard, readCard, readDeck, updateCard} from "../utils/api";
import Breadcrumbs from "./Breadcrumbs";

function EditCard() {
    const [deck, setDeck] = useState({})
    const params = useParams();
    const [front, setFront] = useState("")
    const [back, setBack] = useState("")
    const [card, setCard] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDeck = async () => {
            const abortController = new AbortController();
            const deck = await readDeck(params.deckId, abortController.signal)
            setDeck(deck)
        }
        fetchDeck();
    }, [])

    useEffect(() => {
        const fetchCard = async () => {
            const abortController = new AbortController();
            const card = await readCard(params.cardId, abortController.signal)
            setCard(card)
            setFront(card.front)
            setBack(card.back)
        }
        fetchCard();
    }, [])

    const editCard = async () => {
        const abortController = new AbortController();
        await updateCard({...card, front: front, back: back}, abortController.signal)
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent default submit behavior
        editCard()
        navigate(`/decks/${deck.id}`)
    };

    const handleFrontChange = (event) => setFront(event.target.value);
    const handleBackChange = (event) => setBack(event.target.value);

    return (
        <div>
            <Breadcrumbs cardId={params.cardId} deckName={deck.name}/>
            <h1>Edit Card</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="front">
                    Front:
                    <textarea
                        id="front"
                        name="front"
                        placeholder="Front side of card"
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
                        placeholder="Back side of card"
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

export default EditCard;
