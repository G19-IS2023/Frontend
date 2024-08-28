import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./book_carosel.css"; // Correzione del nome del file CSS
import { useNavigate } from "react-router-dom";
import BookCard from "./BookCard";

function BookCarousel(props) {
  const { items, sortmethod, genre, category } = props;
  const [sortedList, setSortedList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const cardWidth = 180; // Larghezza minima per ogni card
  const navigate = useNavigate();

  function someFun() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/books/full/${category}`, {
      state: {
        books: sortedList,
        title: category,
      },
    });
  }

  useEffect(() => {
    function handleResize() {
      const containerWidth = document.getElementById("card-container").clientWidth;
      const newVisibleCount = Math.floor(containerWidth / cardWidth);
      setVisibleCount(Math.min(newVisibleCount, sortedList.length));
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [sortedList.length]);

  useEffect(() => {
    let list = [...items];
    switch (sortmethod) {
      case 1:
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 2:
        list.sort((a, b) => b.num_pages - a.num_pages);
        break;
      case 3:
        list = list.filter((book) => book.genres.includes(genre));
        break;
      default:
        break;
    }
    setSortedList(list);
  }, [items, sortmethod, genre]);

  return (
    <div>
      <div
        className="titolo_carousel_container"
        id="card-container"
        onClick={someFun}
      >
        <h1 className="altro">{category}</h1>
        <h1 className="puntini">.....</h1>
        <img className="more_icon" alt="More" />
      </div>
      <hr className="linea_titolo" size="5" />
      <div className="cards_container">
        {sortedList.length === 0 ? (
          <p>This list is empty!</p>
        ) : (
          Array.from({ length: visibleCount }, (_, i) => (
            sortedList[i] ? <BookCard key={i} book={sortedList[i]} /> : <div key={i} className="empty_card"></div>
          ))
        )}
      </div>
    </div>
  );
}

BookCarousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      num_pages: PropTypes.number,
      genres: PropTypes.string,
    })
  ).isRequired,
  sortmethod: PropTypes.number,
  category: PropTypes.string.isRequired,
  genre: PropTypes.string,
};

export default BookCarousel;
