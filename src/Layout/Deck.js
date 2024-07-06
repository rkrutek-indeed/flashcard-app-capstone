import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {readDeck} from "../utils/api";
import Breadcrumbs from "./Breadcrumbs";

function Deck({deleteDeck, deleteCard}) {
    const [deck, setDeck] = useState({})
    const [cards, setCards] = useState([])
    const params = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDeck = async () => {
            const abortController = new AbortController();
            const deck = await readDeck(params.deckId, abortController.signal)
            setDeck(deck)
            setCards(deck.cards)
        }
        fetchDeck();
    }, [params.deckId])

    const deleteDeckHandler = ((deckId) => {
        deleteDeck(deckId)
        navigate("/")
    })

    const deleteCardHandler = ((cardId) => {
        deleteCard(cardId)
        navigate(0)
    })

    return (
        <div>
            <Breadcrumbs deckName={deck.name}/>
            <div className="card mb-3 border-0">
                <div className="card-body">
                    <h5 className="card-title">{deck.name}</h5>
                    <p className="card-text">{deck.description}</p>
                    <div className="btn-group mb-3">
                        <Link to={`/decks/${deck.id}/edit`}>
                            <button className="btn btn-primary mr-2">Edit</button>
                        </Link>
                        <Link to={`/decks/${deck.id}/study`}>
                            <button className="btn btn-secondary mr-2">Study</button>
                        </Link>
                        <Link to={`/decks/${deck.id}/cards/new`}>
                            <button className="btn btn-success mr-2">Add cards</button>
                        </Link>
                        <button className="btn btn-danger"
                                onClick={() => deleteDeckHandler(deck.id)}>Delete
                        </button>
                    </div>
                    <h6 className="card-subtitle mb-2 text-muted">Cards</h6>
                    <ul className="list-group">
                        {cards.map((card) => (
                            <li className="list-group-item" key={card.id}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="mb-1">{card.front}</p>
                                        <p className="mb-0">{card.back}</p>
                                    </div>
                                    <div>
                                        <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                                            <button className="btn btn-primary btn-sm mr-2">Edit
                                            </button>
                                        </Link>
                                        <button className="btn btn-danger btn-sm"
                                                onClick={() => deleteCardHandler(card.id)}>Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
)
    ;
}

export default Deck;
