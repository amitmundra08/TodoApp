const loadingStatus = (state = {loadingStatus: true}, action) => {
  switch (action.type) {
    case 'SET_LOADING_STATUS':
      return {...state, loadingStatus: action.status};
    default:
      return state;
  }
};

export default loadingStatus;
