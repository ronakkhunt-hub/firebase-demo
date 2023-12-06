import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostAction,
  deletePostAction,
  getPostAction,
  updatePostAction,
} from "../Redux/actions";
import { getItem } from "../utils";
import ReactModal from "./Modal";
import NavBar from "./Navbar";
import NeedLoggedIn from "./NeedLoggedIn";

function Post() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [postAction, setPostAction] = useState("create");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(
      getPostAction({ url: "https://jsonplaceholder.typicode.com/posts" })
    );
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postAction === "create") {
      dispatch(
        createPostAction({
          url: "https://jsonplaceholder.typicode.com/posts",
          data: { title, body },
        })
      );
    } else {
      dispatch(
        updatePostAction({
          url: "https://jsonplaceholder.typicode.com/posts",
          id,
          data: { id, title, body },
        })
      );
    }
    setTitle("");
    setBody("");
    setShow(false);
  };

  const updatePost = (post) => {
    if (!getItem("profile")?.token) {
      setIsLoggedIn(true);
    } else {
      setShow(true);
      setPostAction("update");
      setId(post.id);
      setTitle(post.title);
      setBody(post.body);
    }
  };

  const deletePost = (id) => {
    if (!getItem("profile")?.token) {
      setIsLoggedIn(true);
    } else {
      dispatch(
        deletePostAction({
          url: "https://jsonplaceholder.typicode.com/posts",
          id,
        })
      );
    }
  };

  return (
    <div>
      <NavBar />
      <div style={{ textAlign: "right", margin: "10px" }}>
        <Button
          onClick={() => {
            if (!getItem("profile")?.token) setIsLoggedIn(true);
            else setShow(true);
            setPostAction("create");
            setTitle("");
            setBody("");
          }}
        >
          Create
        </Button>
      </div>
      <table className="table" style={{ maxWidth: "100%" }}>
        <thead>
          <tr className="text-center">
            <th>No</th>
            <th>Title</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map(
            (post, key) =>
              key + 1 <= 10 && (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td className="d-flex">
                    <Button
                      onClick={() => updatePost(post)}
                      variant="warning"
                      className="m-2"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => deletePost(post.id)}
                      variant="danger"
                      className="m-2"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
      <ReactModal
        title={`${postAction} User`}
        onClose={() => setShow(false)}
        show={show}
      >
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Enter Title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              value={body}
              placeholder="Enter Body"
              onChange={(e) => setBody(e.target.value)}
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
  );
}

export default Post;
