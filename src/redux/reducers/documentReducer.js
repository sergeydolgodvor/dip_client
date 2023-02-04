import ACTIONS from '../actions/types';

const initialState = {
  allDocuments: [],
  foundDocument: {},
};

const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_DOCUMENTS:
      return {
        ...state,
        allDocuments: [...action.payload],
      };
    case ACTIONS.FIND_DOCUMENT:
      return {
        ...state,
        foundDocument: { ...action.payload },
      };
    default:
      return state;
  }
};

export default documentReducer;
