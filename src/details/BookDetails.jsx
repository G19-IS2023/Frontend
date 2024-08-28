import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../App";
import { BOOK_DETAILS_URL } from "../API";
import ProgressBar from "../components/ProgressBar";
import "./book_details.css";
import LibraryDropdown from "../components/LibrayDropdown";

function BookDetails() {
  const [book, setBook] = useState({});
  const { id } = useParams(); // Assuming this is the book ID
  const [progress, setProgress] = useState(0);
  const [readPages, setReadPages] = useState(0);
  const [debouncedReadPages, setDebouncedReadPages] = useState(readPages); // Debounced value
  const [isInLib, setIsInLib] = useState(false); // Stato per verificare se il libro è in una libreria
  const userId = sessionStorage.getItem("userId"); // Fetch the user ID from sessionStorage
  const incrementInterval = useRef(null);
  const decrementInterval = useRef(null);
  const prevReadPages = useRef(0); // Reference to track changes in readPages for API update
  const bookAddedToLibrary = useRef(false); // Reference to ensure book is added only once

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedReadPages(readPages);
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [readPages]);

  // Function to fetch and update read pages from the API
  const fetchAndUpdatePagesRead = async () => {
    try {
      const { data: libraries } = await axios.get(
        `http://localhost:5050/book/getLibraries/${userId}`
      );
      let foundBook = false;

      // Check each library to see if it contains the book
      for (let library of libraries) {
        try {
          const res = await axios.get(
            `http://localhost:5050/book/library/${library.libId}/getBook/${id}/id/${userId}`
          );
          if (res.status === 200 && res.data.pagesRead !== undefined) {
            setReadPages(res.data.pagesRead);
            bookAddedToLibrary.current = true; // Mark that the book is already in a library
            setIsInLib(true); // Aggiorna lo stato di `isInLib` per indicare che il libro è in una libreria
            foundBook = true;
            break;
          }
        } catch (error) {
          console.error("Error fetching book details in library", error);
        }
      }

      // If no book is found in any library, set readPages to 0
      if (!foundBook) {
        setReadPages(0); // Assuming starting from 0 pages read if book not found
      }
    } catch (error) {
      console.error("Failed to fetch libraries or book details", error);
    }
  };

  // Function to add the book to the default library and update pages
  const addBookToLibraryAndSavePages = async () => {
    try {
      if (!bookAddedToLibrary.current && book.num_pages > 0 && readPages > 0) {
        // Aggiungi il libro alla libreria e aggiorna subito le pagine lette

        console.log(`Adding book to library with ${readPages} pages read`);
        await axios.post("http://localhost:5050/book/addBook", {
          bookId: id,
          libId: "1",
          userId: userId,
          pages: readPages, // Usa direttamente readPages invece di debouncedReadPages
        });
        await axios.put("http://localhost:5050/book/modifyPages", {
          bookId: id,
          libId: "1",
          pages: readPages,
          userId: userId,
        });
        bookAddedToLibrary.current = true; // Segna il libro come aggiunto
        setIsInLib(true); // Aggiorna lo stato di `isInLib`
      } else if (bookAddedToLibrary.current) {
        // Se il libro è già nella libreria, aggiorna il numero di pagine
        console.log(
          `Updating book in library with ${debouncedReadPages} pages read`
        );
        await updateReadPagesInLibraries();
      }
    } catch (error) {
      console.error("Failed to add or update book in library", error);
    }
  };

  // Function to update the read pages in all libraries where the book exists
  const updateReadPagesInLibraries = async () => {
    try {
      const { data: libraries } = await axios.get(
        `http://localhost:5050/book/getLibraries/${userId}`
      );
      for (let library of libraries) {
        try {
          await axios.put("http://localhost:5050/book/modifyPages", {
            bookId: id,
            libId: library.libId,
            pages: debouncedReadPages,
            userId: userId,
          });
          console.log(
            `Pages updated to ${debouncedReadPages} in library ${library.libId}`
          );
        } catch (error) {
          console.error("Error updating pages in library", error);
        }
      }
    } catch (error) {
      console.error("Error fetching libraries", error);
    }
  };

  // Handlers for increment and decrement of pages
  const handleIncrement = () => {
    setReadPages((prev) => Math.min(prev + 1, book.num_pages));
  };

  const handleDecrement = () => {
    setReadPages((prev) => Math.max(prev - 1, 0));
  };

  const startIncrement = () => {
    handleIncrement();
    incrementInterval.current = setInterval(handleIncrement, 100);
  };

  const stopIncrement = async () => {
    clearInterval(incrementInterval.current);
    if (prevReadPages.current !== debouncedReadPages) {
      prevReadPages.current = debouncedReadPages;
      await addBookToLibraryAndSavePages(); // Ensure the book is added and pages are updated
    }
  };

  const startDecrement = () => {
    handleDecrement();
    decrementInterval.current = setInterval(handleDecrement, 100);
  };

  const stopDecrement = async () => {
    clearInterval(decrementInterval.current);
    if (prevReadPages.current !== debouncedReadPages) {
      prevReadPages.current = debouncedReadPages;
      await addBookToLibraryAndSavePages(); // Ensure the book is added and pages are updated
    }
  };

  useEffect(() => {
    // Fetch book details first to get the number of pages
    axios
      .get(`${BOOK_DETAILS_URL}/${id}`)
      .then((res) => {
        setBook(res.data);
        fetchAndUpdatePagesRead(); // Fetch and set initial pages read when the component mounts
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (book.num_pages) {
      setProgress((debouncedReadPages / book.num_pages) * 100);
    }
  }, [debouncedReadPages, book.num_pages]);

  // New useEffect to handle updates when debouncedReadPages changes
  useEffect(() => {
    const updateLibraries = async () => {
      if (prevReadPages.current !== debouncedReadPages) {
        prevReadPages.current = debouncedReadPages;
        await addBookToLibraryAndSavePages(); // Ensure the book is added and pages are updated
      }
    };

    updateLibraries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedReadPages]); // Effect triggers when debouncedReadPages changes

  return (
    <>
      <div className="book-details-2">
        <div className="bd_title_container">
          <h2 className="bd_title">{book?.title}</h2>
        </div>
        <div className="book-details">
          <div className="book-image">
            <img src={book?.image_url} alt="Book cover" />
          </div>
          <div className="book-description">
            <div className="book-description-2">
              <h3>Description:</h3>
              <p>{book?.description}</p>
              <h3>Authors</h3>
              <p>{book?.authors}</p>
              <h3>Genres</h3>
              <p>{book?.genres}</p>
              <LibraryDropdown bookId={id} isInLib={isInLib} />
            </div>
          </div>
        </div>
      </div>
      <div className="progress_bar_container">
        <div className="add-pages">
          <img
            src="/src/assets/remove.png"
            className="icon-pages"
            onMouseDown={startDecrement}
            onMouseUp={stopDecrement}
            onMouseLeave={stopDecrement}
            alt="Decrease pages"
          />
          <input
            type="number"
            value={readPages}
            onChange={(e) => {
              const newReadPages = Math.min(
                parseInt(e.target.value) || 0,
                book.num_pages
              );
              setReadPages(newReadPages);
            }}
            className="input-pages"
          />
          <img
            src="/src/assets/add.png"
            className="icon-pages"
            onMouseDown={startIncrement}
            onMouseUp={stopIncrement}
            onMouseLeave={stopIncrement}
            alt="Increase pages"
          />
        </div>
        <p>of {book.num_pages} pages</p>
        <ProgressBar className="progress-bar" progress={progress} />
      </div>
    </>
  );
}

export default BookDetails;
