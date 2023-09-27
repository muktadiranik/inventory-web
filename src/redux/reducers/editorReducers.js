import {
  GET_EDITOR_LIST_REQUEST,
  GET_EDITOR_LIST_SUCCESS,
  GET_EDITOR_LIST_FAILED,
  ADD_EDITOR_REQUEST,
  ADD_EDITOR_SUCCESS,
  ADD_EDITOR_FAILED,
  UPDATE_EDITOR_REQUEST,
  UPDATE_EDITOR_SUCCESS,
  UPDATE_EDITOR_FAILED,
  DELETE_EDITOR_REQUEST,
  DELETE_EDITOR_SUCCESS,
  DELETE_EDITOR_FAILED,
} from "../constant/editorConstants";

export const editorReducer = (
  state = {
    addedEditor: {},
    updatedEditor: {},
    editorList: [],
    loading: false,
    error: null,
    success: false,
    deleteSuccess: false,
    deleteError: null,
  },
  action
) => {
  switch (action.type) {
    case GET_EDITOR_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        editorList: [],
        error: null,
      };
    case GET_EDITOR_LIST_SUCCESS:
      return { ...state, loading: false, editorList: action.payload };
    case GET_EDITOR_LIST_FAILED:
      return { ...state, loading: false, error: action.payload };
    case ADD_EDITOR_REQUEST:
      return {
        ...state,
        loading: true,
        addedEditor: {},
        success: false,
        updatedEditor: {},
      };
    case ADD_EDITOR_SUCCESS:
      return {
        ...state,
        loading: false,
        addedEditor: action.payload,
        success: true,
      };
    case ADD_EDITOR_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case UPDATE_EDITOR_REQUEST:
      return {
        ...state,
        loading: true,
        updatedEditor: {},
        success: false,
        addedEditor: {},
      };
    case UPDATE_EDITOR_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedEditor: action.payload,
        success: true,
      };
    case UPDATE_EDITOR_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case DELETE_EDITOR_REQUEST:
      return {
        ...state,
        loading: true,
        deleteSuccess: false,
        addedEditor: {},
        updatedEditor: {},
      };
    case DELETE_EDITOR_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteSuccess: true,
      };
    case DELETE_EDITOR_FAILED:
      return {
        ...state,
        loading: false,
        deleteError: action.payload,
        deleteSuccess: false,
      };
    default:
      return state;
  }
};
