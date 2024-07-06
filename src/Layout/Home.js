import React from "react";
import {Link} from "react-router-dom";

import DeckList from "./DeckList";

function Home({ decks, deleteDeck }) {
    return (
        <div>
            <Link to={`/decks/new`}>
                <button>Create deck</button>
            </Link>
            <ul>
                {decks.map((deck) => {
                    const filteredCards = deck.cards ? deck.cards.filter(card => card.deckId === deck.id) : [];
                    return (
                        <li key={deck.id}>
                            <DeckList deck={deck} cards={filteredCards} deleteDeck={deleteDeck} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Home;
