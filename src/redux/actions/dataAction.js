import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_UI,
  POST_SCREAM,
  SET_SCREAM,
  STOP_LOADING_UI,
  CLEAR_DATA,
} from "../types";
import axios from "axios";
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("https://us-central1-zigzag-d2feb.cloudfunctions.net/api/topics")
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: {},
      });
    });
};
export const likeScream = (blogId) => (dispatch) => {
  axios
    .get(
      `https://us-central1-zigzag-d2feb.cloudfunctions.net/api/blog/${blogId}/like`
    )
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const unlikeScream = (blogId) => (dispatch) => {
  axios
    .get(`/scream/${blogId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const deleteScream = (blogId) => (dispatch) => {
  axios
    .delete(
      `https://us-central1-zigzag-d2feb.cloudfunctions.net/api/blog/${blogId}`
    )
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: blogId });
    })
    .catch((err) => console.log(err));
};
export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-zigzag-d2feb.cloudfunctions.net/api/blog",
      newScream
    )
    .then((res) => {
      dispatch({ type: POST_SCREAM, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
export const clearData = () => (dispatch) => {
  dispatch({ type: CLEAR_DATA });
};
export const getScream = (blogId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(
      `https://us-central1-zigzag-d2feb.cloudfunctions.net/api/blog/${blogId}`
    )
    .then((res) => {
      dispatch({ type: SET_SCREAM, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
