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

            links.push(
                <Link key={`deck-${deckId}`} to={`/decks/${deckId}`}>
                    {deckName || `Deck ${deckId}`}
                </Link>
            );

            if (pathnames.includes("edit")) {
                links.push(<span key="edit">Edit Deck</span>);
            } else if (pathnames.includes("study")) {
                links.push(<span key="study">Study</span>);
            } else if (pathnames.includes("cards")) {
                if (pathnames.includes("new")) {
                    links.push(<span key="new-card">Add Card</span>);
                } else if (cardId) {
                    links.push(<span key={`edit-card-${cardId}`}>Edit Card {cardId}</span>);
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
