import {
  CREATE_POST,
  CREATE_POST_SUCCESS,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  GET_POST,
  GET_POST_SUCCESS,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
} from "./constants";

export const getPostAction = (payload) => ({
  type: GET_POST,
  payload,
});

export const getPostSuccessAction = (payload) => ({
  type: GET_POST_SUCCESS,
  payload,
});

export const createPostAction = (payload) => ({
  type: CREATE_POST,
  payload,
});

export const createPostSuccessAction = (payload) => ({
  type: CREATE_POST_SUCCESS,
  payload,
});

export const updatePostAction = (payload) => ({
  type: UPDATE_POST,
  payload,
});

export const updatePostSuccessAction = (payload) => ({
  type: UPDATE_POST_SUCCESS,
  payload,
});

export const deletePostAction = (payload) => ({
  type: DELETE_POST,
  payload,
});

export const deletePostSuccessAction = (payload) => ({
  type: DELETE_POST_SUCCESS,
  payload,
});
