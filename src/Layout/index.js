import React, {useEffect, useState} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import {Route, Routes} from "react-router-dom"
import Study from "./Study";
import Deck from "./Deck";
import {createCard, deleteCard, deleteDeck, listDecks} from "../utils/api";
import CardForm from "./CardForm";
import DeckForm from "./DeckForm";

function Layout() {

    const [decks, setDecks] = useState([])

    useEffect(() => {
        const fetchDecks = async () => {
            const abortController = new AbortController();
            const decks = await listDecks(abortController.signal)
            setDecks(decks)
        }
        fetchDecks();
    }, [])

    const removeDeck = async (id) => {
        const confirmDelete = window.confirm("Delete this deck?\nYou will not be able to recover it");

        if (confirmDelete) {
            console.log(`Deleting deck with id ${id}`);
            const abortController = new AbortController();
            try {
                await deleteDeck(id, abortController.signal)
                setDecks(prevDecks => prevDecks.filter(deck => deck.id !== id));
            } catch (error) {
                console.error("Error deleting card:", error);
            }
        }
    }

    const removeCard = async (id) => {
        const confirmDelete = window.confirm("Delete this card?\nYou will not be able to recover it");

        if (confirmDelete) {
            console.log(`Deleting card with id ${id}`);
            const abortController = new AbortController();
            try {
                await deleteCard(id, abortController.signal)
            } catch (error) {
                console.error("Error deleting deck:", error);
            }
        }
    }

    const addNewCard = async (deckId, card) => {
        const abortController = new AbortController();
        try {
            await createCard(deckId, card, abortController.signal)
        } catch (error) {
            console.error("Error adding card:", error);
        }
    }

    return (
    <>
      <Header />
      <div className="container">
          <Routes>
              <Route path="/" element={<Home decks={decks} deleteDeck={removeDeck}/>}/>
              <Route path="/decks" element={<Home decks={decks} deleteDeck={removeDeck}/>} />
              <Route path="/decks/new" element={<DeckForm decks={decks}/>}/>
              <Route path="*" element={<NotFound/>} />
              <Route path="/decks/:deckId/study" element={<Study />} />
              <Route path="/decks/:deckId/" element={<Deck deleteDeck={removeDeck} deleteCard={removeCard}  />} />
              <Route path="/decks/:deckId/cards/new" element={<CardForm addNewCard={addNewCard} />} />
              <Route path="/decks/:deckId/cards/:cardId/edit" element={<CardForm isEditMode={true} />} />
              <Route path="/decks/:deckId/edit" element={<DeckForm isEditMode={true}/>} />
          </Routes>
      </div>
    </>
  );
}

export default Layout;
