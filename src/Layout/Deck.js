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
    }, [])

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
        <h1>{deck.name}</h1>
        <p>{deck.description}</p>

        <Link to={`/decks/${deck.id}/edit`}>
            <button>Edit</button>
        </Link>
        <Link to={`/decks/${deck.id}/study`}>
            <button>Study</button>
        </Link>
        <Link to={`/decks/${deck.id}/cards/new`}>
            <button>Add cards</button>
        </Link>
        <button  onClick={() => {deleteDeckHandler(deck.id)}}>Delete</button>

        <ul>
            {cards.map((card) => {
                return (
                    <li>
                        <p>{card.front}</p>
                        <p>{card.back}</p>
                        <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => {deleteCardHandler(card.id)}}>Delete</button>
                    </li>
                )
            })}
        </ul>

    </div>
  );
}

export default Deck;
