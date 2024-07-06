import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {readDeck} from "../utils/api";
import Breadcrumbs from "./Breadcrumbs";

function Study() {
    const [deck, setDeck] = useState({})
    const [cards, setCards] = useState([])
    const [cardIndex, setCardIndex] = useState(0);
    const [flip, setFlip] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const params = useParams();
    const navigate = useNavigate()


    function NotEnoughCards({cards}) {
        return (
            <div className="text-start">
                <h2>Not enough cards.</h2>
                <p>
                    You need at least 3 cards to study. There are {cards.length} cards in
                    this deck.
                </p>
                <Link to={`/decks/${deck.id}/cards/new`}>
                    <button className="btn-primary me-2">Add Cards</button>
                </Link>
            </div>
        )
    }

    function Cards({cards}) {
        return (
            <div className="text-start">
                <h6 className="mb-3">{`Card ${cardIndex + 1} of ${cards.length}`}</h6>

                <div className="card mb-3">
                    <div className="card-body">
                    {flip === 0 ? <p className="card-text">{cards[cardIndex].front}</p> :
                            <p className="card-text">{cards[cardIndex].back}</p>}
                    </div>
                </div>

                <div className="d-flex justify-content-start">
                    <button className="btn btn-secondary btn" onClick={() => {
                        setFlip(1)
                        setShowNextButton(true)
                    }}>Flip
                    </button>
                    {showNextButton &&
                        <button className="btn-primary me-2" onClick={() => {
                            setFlip(0)
                            setShowNextButton(false);
                            setCardIndex(cardIndex + 1)
                            if (cards.length - 1 === cardIndex) {
                                const response = window.confirm("Restart cards?\nClick 'cancel' to return to home page.")
                                if (response === true) {
                                    setCardIndex(0);
                                } else {
                                    navigate("/")
                                }
                            }
                        }}>Next</button>}
                </div>
            </div>


        )
    }

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

    return (
        <div>
            <Breadcrumbs deckName={deck.name}/>
            <h1>Study: {deck.name}</h1>
            {cards.length < 3 ? (
                    <NotEnoughCards cards={cards}/>
                ) :
                (
                    <Cards cards={cards}/>
                )
            }
        </div>
    );
}

export default Study;
