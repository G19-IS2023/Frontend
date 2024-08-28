import { useState } from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';
import "./fullpage.css";

function FullPage() {
  const location = useLocation();
  const { books, title } = location.state || { books: [], title: '' };
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 30;
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Determine the books to show on the current page
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = books.slice(startIndex, startIndex + booksPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    scrollTo({ top, behavior: "smooth" });
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Row className='container_titolo_fullpage'>
      <h1 className='titolo_fullpage'>{title}</h1>
      </Row>
      <Row className='row_books'>
      <Col sm={2}/>
      <Col sm={8}>
      <div className='book_container'>
      {currentBooks.map((book) => (
          <BookCard key={book.id} book={book}/>
        ))}
        </div>
        </Col>
      <Col sm={2}/>
        
      </Row>
      <Row className="mt-3">
        <Col className="text-center">
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Col>
      </Row>
    </>
  );
}

export default FullPage;
