import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import BookCarousel from "../components/BookCarosel"; // Correzione del nome del file importato
import axios from 'axios'
import { API_URL } from "../API";
import "bootstrap/dist/css/bootstrap.min.css";
import './home.css';
import { useNavigate } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const [bookOfTheDay, setBookOfTheDay] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setBooks(res.data);
        setBookOfTheDay(getDailyBook(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  const getDailyBook = (booksArray) => {
    const dayOfYear = new Date().getDay();
    const randomIndex = (dayOfYear + booksArray.length) % booksArray.length;
    return booksArray[randomIndex];
  };

  return (
    <div className="sfondo_home">
      <div className="book_of_the_day_container">
        <h1 className="titolo_bod">Book of the day!</h1>
        <div className="book_of_the_day_container_2">
          {bookOfTheDay && (
            <>
              <img src={bookOfTheDay.image_url} className="copertina" alt="Book Cover" 
              onClick={() => navigate(`/books/${bookOfTheDay.id}`)}/>
              <div className="book_of_the_day_container_3">
                <h2>{bookOfTheDay.title}</h2>
                <p>{bookOfTheDay.description}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <Container fluid>
        <Row>
          <Col sm={2} />
          <Col sm={8} className="aggiunti_recente_box">
            {books.length > 0 ? <BookCarousel items={books} sortmethod={1} category="Fan favorites"/> : null}
          </Col>
          <Col sm={2} />
        </Row>
        <Row>
          <Col sm={2} />
          <Col sm={8} className="aggiunti_recente_box">
            {books.length > 0 ? <BookCarousel items={books} sortmethod={2} category="Longest"/> : null}
          </Col>
          <Col sm={2} />
        </Row>
        <Row>
          <Col sm={2} />
          <Col sm={8} className="aggiunti_recente_box">
            {books.length > 0 ? <BookCarousel items={books} sortmethod={3} genre="Mystery" category="Mystery"/> : null}
          </Col>
          <Col sm={2} />
        </Row>
      </Container>
    </div>
  );
}

export default Home;
