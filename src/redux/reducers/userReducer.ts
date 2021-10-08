const initialState = {
  user: null,
};

interface IAction {
  type: string;
  payload?: object;
}

export const userReducer = (state = null, action: IAction) => {
  switch (action.type) {
    case 'LOGGED_IN_USER': {
      return action.payload;
    }
    case 'LOGOUT': {
      return action.payload;
    }

    default:
      return state;
  }
};
