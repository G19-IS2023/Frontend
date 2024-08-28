import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import "./bookcard.css";
import { useNavigate } from "react-router-dom";

function BookCard(props) {
    const item=props.book;
    const navigate = useNavigate();
  return (
    <Card style={{ width: "10rem" }} className="card" key={item.id}>
      <Card.Img
        variant="top"
        src={item.image_url}
        className="card_image"
        onClick={() => 
        navigate(`/books/${item.id}`)}
      />
      <Card.Body className="card_body">
        <Card.Title className="card-title">{item.title}</Card.Title>
        <p>{item.authors}</p>
      </Card.Body>
    </Card>
  )
}

BookCard.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        image_url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.string.isRequired,
    }).isRequired,
};

export default BookCard