import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BookCarousel from "../components/BookCarosel";
import "./librarylist.css";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

const LibraryList = () => {
  const [libraries, setLibraries] = useState([]);
  const [deletableLibraries, setDeletableLibraries] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [newLibraryName, setNewLibraryName] = useState("");
  const [selectedLibraryId, setSelectedLibraryId] = useState(null);


  const handleCreateLibrary = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleOpenDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleConfirmDelete = (libraryId) => {
    setSelectedLibraryId(libraryId);
    setShowDeleteModal(false);
    setShowConfirmDeleteModal(true);
  };

  const handleDeleteLibrary = async () => {
    if (selectedLibraryId === '1') {
      alert("The 'Your Books' library cannot be deleted.");
      return;
    }
    const userId = sessionStorage.getItem("userId");
    const response = await fetch(`http://localhost:5050/book/deleteLibrary/${selectedLibraryId}/id/${userId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      setLibraries(libraries.filter(library => library.libId !== selectedLibraryId))
      setShowConfirmDeleteModal(false);
    } else {
      alert('Failed to delete library');
    }
  };

  const handleCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false);
    setShowDeleteModal(true);  // Re-open the delete modal in case they want to select again
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    fetch(`http://localhost:5050/book/getLibraries/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const libs = data;
        libs.forEach((library) => {
          if (library.books.length === 0) {
            setLibraries((prevLibraries) => {
              const exists = prevLibraries.some((lib) => lib.libId === library.libId);
              if (!exists) {
                return [...prevLibraries, { libId: library.libId, libName: library.libName, books: [] }];
              }
              return prevLibraries;
            });
          } else {
            const bookDetailsPromises = library.books.map(async (book) => {
              return fetch(`https://example-data.draftbit.com/books?id=${book.bookId}`)
                .then((response) => response.json())
                .then((bookDetails) => {
                  return {...bookDetails[0], pagesRead: book.pagesRead};
                })
                .catch((err) => {
                  console.error(`Error fetching book details for ${book.bookId}`, err);
                  return null;
                });
            });

            Promise.all(bookDetailsPromises).then((completedBooks) => {
              setLibraries((prevLibraries) => {
                const updatedLibraries = prevLibraries.map((lib) =>
                  lib.libId === library.libId
                    ? {...lib, books: completedBooks.filter((book) => book != null)}
                    : lib
                );
                const exists = updatedLibraries.some((lib) => lib.libId === library.libId);
                if (!exists) {
                  updatedLibraries.push({
                    libId: library.libId,
                    libName: library.libName,
                    books: completedBooks.filter((book) => book != null),
                  });
                }
                return updatedLibraries;
              });
            });
          }
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the libraries!", error);
      });

      const filteredLibraries = libraries.filter(library => library.libId !== "1");
        setDeletableLibraries(filteredLibraries);
  }, [libraries]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const userId = sessionStorage.getItem("userId");
    const newLibId = `lib-${Date.now()}`; // Generate a unique ID for the library
    try {
      const response = await fetch('http://localhost:5050/book/createLibrary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          libName: newLibraryName,
          libId: newLibId,
          userId: userId
        })
      });
      if (response.ok) {
        const newLib = { libId: newLibId, libName: newLibraryName, books: [] };
        setLibraries(prevLibraries => [...prevLibraries, newLib]);
        setNewLibraryName(""); // Reset the input after successful submission
        setShowCreateModal(false); // Close the modal
      } else {
        throw new Error('Failed to create library');
      }
    } catch (error) {
      console.error("Error creating library:", error);
      alert("Error creating library, please try again.");
    }
  };

  return (
    <div className="libraryListBody">
      <Row>
        <Col sm={2} className="text-center"></Col>
        <Col sm={8}>
          {libraries.map((library) => (
            <BookCarousel key={library.libId} items={library.books || []} category={library.libName} />
          ))}
        </Col>
        <Col sm={2}>
          <IoAddCircleOutline size={30} onClick={handleCreateLibrary} style={{ cursor: 'pointer' }} />
          <IoRemoveCircleOutline size={30} onClick={handleOpenDeleteModal} style={{ cursor: 'pointer' }} />
        </Col>
      </Row>

      {/* Create Library Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Library</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="newLibraryName">
              <Form.Label>Library Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new library name"
                value={newLibraryName}
                onChange={(e) => setNewLibraryName(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Create Library</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Library Selection Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Library to Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deletableLibraries.length > 0 ? (
            deletableLibraries.map((library) => (
              <p key={library.libId} style={{ cursor: 'pointer' }} onClick={() => handleConfirmDelete(library.libId)}>
                {library.libName}
              </p>
            ))
          ) : (
            <p>There are no libraries to delete.</p>
          )}
        </Modal.Body>
      </Modal>

      {/* Confirm Delete Library Modal */}
      <Modal show={showConfirmDeleteModal} onHide={handleCloseConfirmDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this library?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmDeleteModal}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteLibrary}>Delete Library</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LibraryList;