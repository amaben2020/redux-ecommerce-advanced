const initialState = {
  text: '',
};

interface IAction {
  type: string;
  payload?: object;
}

export const searchReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'SEARCH_QUERY': {
      return {
        ...state,
        text: action.payload,
      };
    }
    default:
      return state;
  }
};
