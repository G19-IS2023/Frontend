import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./usersettings.css";
import { Row, Col } from "react-bootstrap";

function UserSettings() {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [field, setField] = useState("");
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [user, setUser] = useState({
    name: "Guest",
    email: "guest@example.com",
  });
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `http://localhost:5050/user/getUser/${userId}`
          );
          if (response.ok) {
            const data = await response.json();
            setUser({
              name: data.name,
              email: data.email,
            });
          } else {
            console.error("User not found, setting default guest values.");
            setUser({
              name: "Guest",
              email: "guest@example.com",
            });
          }
        } catch (error) {
          console.error(
            "Cannot complete the task, setting default guest values.",
            error
          );
          setUser({
            name: "Guest",
            email: "guest@example.com",
          });
        }
      } else {
        console.error(
          "No userId found in sessionStorage, setting default guest values."
        );
        setUser({
          name: "Guest",
          email: "guest@example.com",
        });
      }
    };

    fetchUserData();

    const handleStorageChange = (event) => {
      if (event.key === "userId") {
        setUserId(event.newValue); // Aggiorna userId se cambia nel local storage
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [userId]);

  const handleClose = () => setShow(false);
  const handleShow = (fieldName) => {
    setField(fieldName);
    setShow(true);
  };

  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);

  const handleDeleteAccount = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");
      await axios.delete(
        `http://localhost:5050/user/deleteProfile/${userId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      setShowDelete(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");
      await axios.put(
        "http://localhost:5050/user/modifyUsername",
        {
          userId: userId,
          newUsername: username,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setShow(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update username:", error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");
      await axios.put(
        "http://localhost:5050/user/modifyPassword",
        {
          userId: userId,
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setShow(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update password:", error);
    }
  };

  return (
    <div className="usbody">
      <Row>
        <Col sm={2}></Col>
        <Col sm={8}>
          <div className="user-details">
            <h1 className="titolo-user">User Settings</h1>
            <img
              src="/src/assets/guest.png"
              className="profile_picture"
              alt="Profile"
            />
            <h2 className="nome">{user ? `${user.name}` : "Guest"}</h2>
            <h4>{user ? `${user.email}` : "Guest"}</h4>
          </div>
        </Col>
        <Col sm={2}></Col>
      </Row>
      <Row>
        <Col sm={2}></Col>
        <Col sm={8}>
          {user ? (
            <div className="box-bottoni">
              <Button
                className="bottoni-user"
                onClick={() => handleShow("username")}
              >
                Change Username
              </Button>
              <Button
                className="bottoni-user"
                onClick={() => handleShow("password")}
              >
                Change Password
              </Button>
              <Button
                className="bottone-user-delete"
                variant="danger"
                onClick={handleDeleteShow}
              >
                Delete Account
              </Button>
            </div>
          ) : (
            <>
              <p>Log in to manage your account</p>
              <Button
                variant="primary"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </Button>
            </>
          )}
        </Col>
        <Col sm={2}></Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica {field}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={
              field === "username" ? handleUsernameSubmit : handlePasswordSubmit
            }
          >
            {field === "username" ? (
              <Form.Group>
                <Form.Label>Nuovo Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
            ) : (
              <>
                <Form.Group>
                  <Form.Label>Vecchia Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Nuova Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>
              </>
            )}
            <Button variant="primary" type="submit">
              Salva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare il tuo account? Questa azione è
          irreversibile.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Elimina Account
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserSettings;
