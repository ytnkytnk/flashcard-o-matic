import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

// function BreadCrumb() {
//   const location = useLocation();
//   console.log(location);
//   const pathnames = location.pathname.split("/").filter((x) => x);

//   const { deckId, cardId } = useParams();

//   // do not show breadcrumbs on Home page
//   if (pathnames.length === 0) return null;

//   const breadcrumbs = [];

//   let currentLink = "";

//   pathnames.forEach((name, index) => {
//     currentLink += `/${name}`;

//     // skip 'decks' and 'cards' in the breadcrumbs
//     // if (name === "decks" || name === "cards") return;

//     let label = name.charAt(0).toUpperCase() + name.slice(1);

//     if (index === pathnames.length - 1) {
//       // last item, no link
//       breadcrumbs.push(<span>{label}</span>);
//     } else {
//       breadcrumbs.push(<Link to={currentLink}>{label}</Link>);
//     }

//     // add separator
//     if (index < pathnames.length - 1) {
//       breadcrumbs.push(<span> / </span>);
//     }
//   });

//   return (
//     <nav>
//       <Link to="/">Home</Link>
//       {breadcrumbs.length > 0 && <span> / </span>}
//       {breadcrumbs}
//     </nav>
//   );
// }

function BreadCrumb() {
  const location = useLocation();

  const [deckTitle, setDeckTitle] = useState("");
  const pathnames = location.pathname.split("/").filter((x) => x);
  //   console.log("pathnames:", pathnames);

  useEffect(() => {
    const fetchDeckTitle = async () => {
      if (pathnames[0] === "decks" && pathnames[1] && pathnames[1] !== "new") {
        try {
          const deck = await readDeck(pathnames[1]);
          setDeckTitle(deck.name);
        } catch (error) {
          console.error("Failed to fetch deck:", error);
          setDeckTitle("");
        }
      }
    };

    fetchDeckTitle();
  }, [pathnames]);

  if (pathnames.length === 0) return null; // Don't show breadcrumbs on home page

  const breadcrumbs = [];

  // Always add Home link except for home page
  breadcrumbs.push(
    <Link key="home" to="/">
      Home
    </Link>
  );

  if (pathnames[0] === "decks") {
    if (pathnames[1] === "new") {
      breadcrumbs.push(<span key="create">Create Deck</span>);
    } else if (pathnames[1]) {
      if (pathnames.length === 2) {
        // If we're on the deck page, don't make it a link
        breadcrumbs.push(<span key="deck">{deckTitle || "Loading..."}</span>);
      } else
        breadcrumbs.push(
          <Link key="deck" to={`/decks/${pathnames[1]}`}>
            {deckTitle || "Loading..."}
          </Link>
        );

      if (pathnames[2] === "study") {
        breadcrumbs.push(<span key="study">Study</span>);
      } else if (pathnames[2] === "edit") {
        breadcrumbs.push(<span key="edit">Edit Deck</span>);
      } else if (pathnames[2] === "cards") {
        if (pathnames[3] === "new") {
          breadcrumbs.push(<span key="addCard">Add Card</span>);
        } else if (pathnames[4] === "edit") {
          breadcrumbs.push(
            <span key="editCard">Edit Card {pathnames[3]}</span>
          );
        }
      }
    }
  }

  return (
    <nav aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span> / </span>}
          {breadcrumb}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default BreadCrumb;
