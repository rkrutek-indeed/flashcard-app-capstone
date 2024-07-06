import React, {useEffect, useState} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import { Routes, Route} from "react-router-dom"
import Study from "./Study";
import Deck from "./Deck";
import {createCard, createDeck, deleteCard, deleteDeck, listDecks, updateDeck} from "../utils/api";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";

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

    const addNewDeck = async (name, description) => {
        console.log(`Creating deck`);
        const abortController = new AbortController();
        try {
            const newDeck = await createDeck({name: name, description: description}, abortController.signal)
            setDecks([...decks, newDeck])
        } catch (error) {
            console.error("Error creating deck:", error);
        }
    }

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
              <Route path="/decks/new" element={<CreateDeck decks={decks} addNewDeck={addNewDeck}/>}/>
              <Route path="*" element={<NotFound/>} />
              <Route path="/decks/:deckId/study" element={<Study />} />
              <Route path="/decks/:deckId/" element={<Deck deleteDeck={removeDeck} deleteCard={removeCard}  />} />
              <Route path="/decks/:deckId/cards/new" element={<AddCard addNewCard={addNewCard} />} />
              <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
              <Route path="/decks/:deckId/edit" element={<EditDeck/>} />
          </Routes>
      </div>
    </>
  );
}

export default Layout;
