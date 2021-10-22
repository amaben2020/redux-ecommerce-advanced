let initialState = [];

// interface IAction {
//   type: string;
//   payload?: object;
// }

//load cart items from ls
if (typeof window !== 'undefined') {
  if (localStorage.getItem('cart')) {
    initialState = JSON.parse(localStorage.getItem('cart'));
  } else {
    initialState = [];
  }
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      return action.payload;
    }
    default:
      return state;
  }
};
