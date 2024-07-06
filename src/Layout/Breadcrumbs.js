import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = ({ deck }) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <div className="breadcrumbs">
            <Link to="/">Home</Link>
            {pathnames.map((path, index) => {
                const isLast = index === pathnames.length - 1;
                const isStudyPath = path === "study";
                const isNewDeckPath = path === "new";
                const isDeckId = !isNaN(path) && pathnames[index - 1] === "decks";

                if (isDeckId || path === "decks") {
                    return null; // Skip rendering "decks" and deck ID
                }

                return (
                    <React.Fragment key={path}>
                        <span> / </span>
                        {isLast && isStudyPath ? (
                            <span>
                                {deck && (
                                    <>
                                        <Link to={`/decks/${deck.id}`}>{deck.name}</Link> / Study
                                    </>
                                )}
                            </span>
                        ) : isLast && isNewDeckPath ? (
                            <span>Create Deck</span>
                        ) : (
                            <Link to={`/${pathnames.slice(0, index + 1).join("/")}`}>
                                {decodeURIComponent(path)}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Breadcrumbs;
