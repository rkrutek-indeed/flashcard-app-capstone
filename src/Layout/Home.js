import React from "react";
import {Link} from "react-router-dom";

import DeckList from "./DeckList";

function Home({ decks, deleteDeck }) {
    return (
        <div>
            <Link to={`/decks/new`}>
                <button className="btn btn-secondary mb-3">Create deck</button>
            </Link>
            <ul className="list-unstyled">
                {decks.map((deck) => {
                    const filteredCards = deck.cards ? deck.cards.filter(card => card.id === deck.id) : [];
                    return (
                        <li key={deck.id} className="mb-2">
                            <DeckList deck={deck} cards={filteredCards} deleteDeck={deleteDeck}/>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Home;
