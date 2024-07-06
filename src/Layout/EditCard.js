import React, {useEffect} from "react";
import { useState } from "react"
import {Link, useNavigate, useParams} from "react-router-dom";
import {readCard, readDeck, updateCard} from "../utils/api";
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
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label htmlFor="front" className="form-label">
                        Front:
                    </label>
                    <textarea
                        id="front"
                        name="front"
                        placeholder="Front side of card"
                        required={true}
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
                        placeholder="Back side of card"
                        required={true}
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

export default EditCard;
