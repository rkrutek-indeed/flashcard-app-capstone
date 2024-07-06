import React from "react";
import {Link} from "react-router-dom";

import DeckList from "./DeckList";

function Home( {decks, deleteDeck}) {

  return (
    <div >
        <Link to={`/decks/new`}>
            <button >Create deck</button>
        </Link>
        <ul>
            {decks.map((deck) => {
                return (
                <li>
                    <DeckList deck={deck} cards={deck.cards.filter(card => card.deckId === deck.id)} deleteDeck={deleteDeck} />
                </li>
            )
        })}
        </ul>

    </div>
  );
}

export default Home;
