import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import Breadcrumbs from "./Breadcrumbs";

function CardForm({ isEditMode = false, addNewCard }) {
    const [deck, setDeck] = useState({});
    const params = useParams();
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [card, setCard] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDeck = async () => {
            const abortController = new AbortController();
            const deck = await readDeck(params.deckId, abortController.signal);
            setDeck(deck);
        };
        fetchDeck();
    }, [params.deckId]);

    useEffect(() => {
        const fetchCard = async () => {
            if (isEditMode) {
                const abortController = new AbortController();
                const card = await readCard(params.cardId, abortController.signal);
                setCard(card);
                setFront(card.front);
                setBack(card.back);
            }
        };
        fetchCard();
    }, [isEditMode, params.cardId]);

    const saveCard = async () => {
        const abortController = new AbortController();
        if (isEditMode) {
            await updateCard({ ...card, front: front, back: back }, abortController.signal);
        } else {
            // Add new card logic here
            addNewCard(params.deckId, { front: front, back: back });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        saveCard();
        navigate(`/decks/${deck.id}`);
    };

    const handleFrontChange = (event) => setFront(event.target.value);
    const handleBackChange = (event) => setBack(event.target.value);

    return (
        <div>
            <Breadcrumbs cardId={params.cardId} deckName={deck.name} />
            <h1>{isEditMode ? "Edit Card" : "Add Card"}</h1>
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

export default CardForm;
