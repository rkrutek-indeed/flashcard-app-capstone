import React from "react";
import { Link, useNavigate } from "react-router-dom";

function DeckList({ deck, deleteDeck }) {
    const navigate = useNavigate();

    const deleteDeckHandler = (deckId) => {
        deleteDeck(deckId);
        navigate(0);
    };

    return (
        <div>
            <h1>{deck.name}</h1>
            <p>{deck.description}</p>
            <p>{deck.cards ? deck.cards.length : 0} cards</p>
            <Link to={`/decks/${deck.id}`}>
                <button>View</button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
                <button>Study</button>
            </Link>
            <button onClick={() => deleteDeckHandler(deck.id)}>Delete</button>
        </div>
    );
}

export default DeckList;