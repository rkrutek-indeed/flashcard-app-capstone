import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = ({ deckName, cardId }) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    const breadcrumbLinks = () => {
        const links = [
            <Link key="home" to="/">
                Home
            </Link>,
        ];

        if (pathnames.includes("decks")) {
            const deckIndex = pathnames.indexOf("decks");
            const deckId = pathnames[deckIndex + 1];

            if (deckId === "new") {
                links.push(<span key="new-deck">Create Deck</span>);
            } else {
                const isSpecificPath = pathnames.length === 2 && pathnames[1] !== "new";

                links.push(
                    isSpecificPath ? (
                        <span key={`deck-${deckId}`}>
                        {deckName || `Deck ${deckId}`}
                    </span>
                    ) : (
                        <Link key={`deck-${deckId}`} to={`/decks/${deckId}`}>
                            {deckName || `Deck ${deckId}`}
                        </Link>
                    )
                );

                if (pathnames.includes("edit") && !pathnames.includes("cards")) {
                    links.push(<span key="edit">Edit Deck</span>);
                } else if (pathnames.includes("study")) {
                    links.push(<span key="study">Study</span>);
                } else if (pathnames.includes("cards")) {
                    const cardIndex = pathnames.indexOf("cards");
                    const cardId = pathnames[cardIndex + 1];

                    if (pathnames.includes("new")) {
                        links.push(<span key="new-card">Add Card</span>);
                    } else if (cardId) {
                        const editIndex = pathnames.indexOf("edit");
                        if (editIndex !== -1) {
                            links.push(<span key={`edit-card-${cardId}`}>Edit Card {cardId}</span>);
                        }
                    }
                }
            }
        } else if (pathnames.includes("new")) {
            links.push(<span key="new-deck">Create Deck</span>);
        }

        return links;
    };

    return (
        <div className="breadcrumbs">
            {breadcrumbLinks().map((link, index) => (
                <span key={index}>
          {index > 0 && " / "}
                    {link}
        </span>
            ))}
        </div>
    );
};

export default Breadcrumbs;
