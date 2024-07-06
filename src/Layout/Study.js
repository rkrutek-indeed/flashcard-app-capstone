import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import Breadcrumbs from "./Breadcrumbs";

function Study() {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDeck = async () => {
            const abortController = new AbortController();
            const fetchedDeck = await readDeck(params.deckId, abortController.signal);
            setDeck(fetchedDeck);
            setCards(fetchedDeck.cards);
        };
        fetchDeck();
    }, [params.deckId]);

    const handleFlipCard = () => {
        setIsCardFlipped(!isCardFlipped);
        setShowNextButton(!isCardFlipped);
    };

    const handleNextCard = () => {
        setIsCardFlipped(false);
        setShowNextButton(false);
        if (currentCardIndex === cards.length - 1) {
            const shouldRestart = window.confirm("Restart cards?\nClick 'cancel' to return to home page.");
            shouldRestart ? setCurrentCardIndex(0) : navigate("/");
        } else {
            setCurrentCardIndex(currentCardIndex + 1);
        }
    };

    const renderCardStudyView = () => (
        <div className="text-start">
            <h6 className="mb-3">{`Card ${currentCardIndex + 1} of ${cards.length}`}</h6>
            <div className="card mb-3">
                <div className="card-body">
                    <p className="card-text">{isCardFlipped ? cards[currentCardIndex].back : cards[currentCardIndex].front}</p>
                </div>
            </div>
            <div className="d-flex justify-content-start">
                <button className="btn btn-secondary btn" onClick={handleFlipCard}>
                    {isCardFlipped ? "Flip Back" : "Flip"}
                </button>
                {showNextButton && (
                    <button className="btn btn-primary ms-2 next-button" onClick={handleNextCard}>
                        Next
                    </button>
                )}
            </div>
        </div>
    );


    return (
        <div>
            <Breadcrumbs deckName={deck.name} />
            <h1>Study: {deck.name}</h1>
            {cards.length < 3 ? (
                <div className="text-start">
                    <h2>Not enough cards.</h2>
                    <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
                    <Link to={`/decks/${deck.id}/cards/new`}>
                        <button className="btn btn-primary">Add Cards</button>
                    </Link>
                </div>
            ) : (
                renderCardStudyView()
            )}
        </div>
    );
}

export default Study;
