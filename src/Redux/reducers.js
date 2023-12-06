import {
  CREATE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  GET_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
} from "./constants";

const initialState = {
  posts: [],
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POST_SUCCESS:
      return { ...state, posts: payload };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    case UPDATE_POST_SUCCESS:
      const newArray = [...state.posts];
      const index = newArray.findIndex((post) => post.id === payload.id);
      newArray[index] = { ...newArray[index], ...payload.data };
      return {
        ...state,
        posts: newArray,
      };
    case DELETE_POST_SUCCESS:
      const updateArray = state.posts.filter((post) => post.id !== payload.id);
      return {
        ...state,
        posts: updateArray,
      };
    default:
      return state;
  }
};
