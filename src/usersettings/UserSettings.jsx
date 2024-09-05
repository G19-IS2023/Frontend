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
  const [confNewPassword, setConfNewPassword] = useState("");
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
            `${import.meta.env.VITE_URL}/user/getUser/${userId}`
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
        `${import.meta.env.VITE_URL}/user/deleteProfile/${userId}`,
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
        `${import.meta.env.VITE_URL}/user/modifyUsername`,
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
    if (newPassword == confNewPassword) {
      e.preventDefault();
      try {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("userId");
        await axios.put(
          `${import.meta.env.VITE_URL}/user/modifyPassword`,
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
        if ((error = 406)) {
          alert(
            "Password must contain a number, a letter and a special character (? ! . _ - @ |). The password must be at least 8 character long."
          );
        } else {
          alert("Error updating the password");
        }
      }
    } else {
      alert("Passwords don't match");
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
              src="/assets/guest.png"
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
          <Modal.Title>Modify {field}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={
              field === "username" ? handleUsernameSubmit : handlePasswordSubmit
            }
          >
            {field === "username" ? (
              <Form.Group>
                <Form.Label>New Username</Form.Label>
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
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Repeat new Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confNewPassword}
                    onChange={(e) => setConfNewPassword(e.target.value)}
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
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This action is
          irreversible.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserSettings;
