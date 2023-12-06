import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import NavBar from "./Navbar";
import { db, storage } from "../firebase-config";
import ReactModal from "./Modal";
import NeedLoggedIn from "./NeedLoggedIn";
import { getItem } from "../utils";

function User() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [description, setDescription] = useState("");
  const [profile, setProfile] = useState("");
  const [userAction, setUserAction] = useState("create");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);

  const userCollection = collection(db, "users");

  useEffect(() => {
    const getUser = async () => {
      const users = await getDocs(collection(db, "users"));
      const usersData = users.docs.map((user) => ({
        ...user.data(),
        id: user.id,
      }));
      setUsers(usersData);
    };
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userAction === "create") {
      await addDoc(userCollection, {
        name,
        email,
        profile,
        dob,
        description,
      }).then((result) => {
        setUsers([
          { id: result.id, name, email, profile, dob, description },
          ...users,
        ]);
      });
    } else {
      const updateCollection = doc(db, "users", id);
      await updateDoc(updateCollection, {
        name,
        email,
        profile,
        dob,
        description,
      });
      let newArray = [...users];
      const index = newArray.findIndex((user) => user.id === id);
      newArray[index] = {
        ...newArray[index],
        name,
        profile,
        email,
        dob,
        description,
      };
      setUsers(newArray);
    }
    setId("");
    setName("");
    setEmail("");
    setDob("");
    setProfile("");
    setDescription("");
    setShow(false);
  };

  const updateUser = (user) => {
    if (!getItem("profile")?.token) {
      setIsLoggedIn(true);
    } else {
      setShow(true);
      setUserAction("update");
      setId(user.id);
      setName(user.name);
      setEmail(user.email);
      setDob(user.dob);
      setProfile(user.profile);
      setDescription(user.description);
    }
  };

  const deleteUser = async (id) => {
    if (!getItem("profile")?.token) {
      setIsLoggedIn(true);
    } else {
      const deleteCollection = doc(db, "users", id);
      await deleteDoc(deleteCollection).then(() => {
        const newArray = users.filter((user) => user.id !== id);
        setUsers(newArray);
      });
    }
  };

  const onUploadImage = (file) => {
    const uploadRef = ref(
      storage,
      `images/${file.name}${new Date().getTime()}`
    );
    uploadBytes(uploadRef, file).then((result) => {
      getDownloadURL(result.ref).then((url) => {
        setProfile(url);
      });
    });
  };

  return (
    <>
      <NavBar />
      <div style={{ textAlign: "right", margin: "10px" }}>
        <Button
          onClick={() => {
            if (!getItem("profile")?.token) setIsLoggedIn(true);
            else setShow(true);
            setUserAction("create");
            setId("");
            setName("");
            setEmail("");
            setDob("");
            setProfile("");
            setDescription("");
          }}
        >
          Create
        </Button>
      </div>
      <div className="m-3">
        <Container className="d-flex flex-wrap justify-content-center">
          {users?.map((user, key) => (
            <Card className="m-1" key={key}>
              <Card.Header className="text-center">{user.name}</Card.Header>
              <Card.Body>
                <div className="text-center my-2">
                  <img
                    style={{ width: "60px", height: "60px" }}
                    src={user.profile}
                  />
                </div>
                <div className="text-left">
                  <b>Name:</b> {user.name}
                  <br />
                  <b>Email:</b> {user.email}
                  <br />
                  <b>DOB:</b> {user.dob}
                  <br />
                  <b>Description:</b> {user.description}
                </div>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button
                  onClick={() => updateUser(user)}
                  variant="warning"
                  className="m-2"
                >
                  Update
                </Button>
                <Button
                  onClick={() => deleteUser(user.id)}
                  variant="danger"
                  className="m-2"
                >
                  Delete
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </Container>

        <ReactModal
          title={`${userAction} User`}
          onClose={() => setShow(false)}
          show={show}
        >
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Enter Title"
                autoFocus
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="input"
                type="email"
                value={email}
                required
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="input"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="file"
                onChange={(e) => onUploadImage(e.target.files[0])}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Button className="m-2" type="submit">
                Submit
              </Button>
              <Button
                onClick={() => setShow(false)}
                className="m-2"
                variant="danger"
                type="reset"
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
        </ReactModal>

        <NeedLoggedIn
          onClose={() => setIsLoggedIn(false)}
          title="Login"
          show={isLoggedIn}
        />
      </div>
    </>
  );
}

export default User;
