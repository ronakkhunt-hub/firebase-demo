import { call, takeEvery, put } from "redux-saga/effects";
import {
  createPostSuccessAction,
  deletePostSuccessAction,
  getPostSuccessAction,
  updatePostSuccessAction,
} from "./actions";
import {
  deleteOptions,
  getOptions,
  postOptions,
  putOptions,
} from "./apiClient";
import { CREATE_POST, DELETE_POST, GET_POST, UPDATE_POST } from "./constants";

export function* getPost(action) {
  const { url } = action.payload;
  try {
    const result = yield call(getOptions, url);
    yield put(getPostSuccessAction(result.data));
  } catch (error) {
    console.log("error", error);
  }
}

export function* createPost(action) {
  const { url, data } = action.payload;
  try {
    const result = yield call(postOptions, url, data);
    yield put(createPostSuccessAction(result.data));
  } catch (error) {
    console.log("error", error);
  }
}

export function* updatePost(action) {
  const { url, id, data } = action.payload;
  try {
    yield call(putOptions, url, id, data);
    yield put(updatePostSuccessAction({ id, data }));
  } catch (error) {
    console.log("error", error);
  }
}

export function* deletePost(action) {
  const { url, id } = action.payload;
  try {
    yield call(deleteOptions, url, id);
    yield put(deletePostSuccessAction({ id }));
  } catch (error) {
    console.log("error", error);
  }
}

export function* rootSaga() {
  yield takeEvery(GET_POST, getPost);
  yield takeEvery(CREATE_POST, createPost);
  yield takeEvery(UPDATE_POST, updatePost);
  yield takeEvery(DELETE_POST, deletePost);
}
