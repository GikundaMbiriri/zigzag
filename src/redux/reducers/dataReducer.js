import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  STOP_LOADING_UI,
  CLEAR_DATA,
} from "../types";
const initialState = {
  screams: {},
  scream: {},
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams[action.payload.topic].findIndex(
        (scream) => scream.blogId === action.payload.blogId
      );
      state.screams[action.payload.topic][index] = action.payload;
      return {
        ...state,
      };
    case DELETE_SCREAM:
      let inde = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(inde, 1);
      return {
        ...state,
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case CLEAR_DATA:
      return {
        ...state,
        scream: {},
      };
    default:
      return state;
  }
}
