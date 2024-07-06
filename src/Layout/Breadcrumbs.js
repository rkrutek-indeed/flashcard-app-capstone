import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const getBreadcrumbText = (pathname) => {
        switch (pathname) {
            case '':
                return 'Home';
            case 'decks':
                return 'Decks';
            case 'decks/new':
                return 'Create Deck';
            case `decks/${pathnames[pathnames.length - 1]}/study`:
                return 'Study';
            case `decks/${pathnames[pathnames.length - 1]}`:
                return `Deck: ${pathnames[pathnames.length - 1]}`;
            default:
                return pathname;
        }
    };

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const breadcrumbText = getBreadcrumbText(isLast ? name : routeTo);
                    return isLast ? (
                        <li key={name} className="breadcrumb-item active" aria-current="page">
                            {breadcrumbText}
                        </li>
                    ) : (
                        <li key={name} className="breadcrumb-item">
                            <Link to={`${routeTo}`}>{breadcrumbText}</Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;