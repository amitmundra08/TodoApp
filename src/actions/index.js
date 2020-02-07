import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  SHOW_ALL,
  SHOW_ACTIVE,
  SHOW_COMPLETED,
  DELETE_TODO,
  SET_LOADING_STATUS,
  SET_TODO,
} from './actionTypes';

export const addTodo = (id, text) => ({
  type: ADD_TODO,
  id: id,
  text: text,
});

export const setTodo = todo => ({
  type: SET_TODO,
  todo,
});

export const setLoadingStatus = status => ({
  type: SET_LOADING_STATUS,
  status,
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id,
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id,
});

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter,
});

export const VisibilityFilters = {
  SHOW_ALL: SHOW_ALL,
  SHOW_COMPLETED: SHOW_COMPLETED,
  SHOW_ACTIVE: SHOW_ACTIVE,
};
