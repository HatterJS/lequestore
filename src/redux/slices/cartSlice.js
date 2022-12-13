const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  isOpenCart: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, size, amount } = action.payload;
      if (
        state.cart.map((obj) => obj.id).includes(id) &&
        state.cart.map((obj) => obj.size).includes(size)
      ) {
        state.cart = state.cart.map((obj) =>
          obj.id === id && obj.size === size ? { ...obj, amount: obj.amount + amount } : obj
        );
      } else {
        state.cart = [...state.cart, action.payload];
      }
      setLocalStorageCart(state.cart);
    },
    deleteFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.cart = state.cart.filter((obj) => obj.id !== id || obj.size !== size);
      setLocalStorageCart(state.cart);
    },
    increaseAmount: (state, action) => {
      const { id, size } = action.payload;
      state.cart = state.cart.map((obj) =>
        obj.id === id && obj.size === size ? { ...obj, amount: ++obj.amount } : obj
      );
      setLocalStorageCart(state.cart);
    },
    decreaseAmount: (state, action) => {
      const { id, size } = action.payload;
      state.cart = state.cart.map((obj) =>
        obj.id === id && obj.size === size && obj.amount > 1
          ? { ...obj, amount: --obj.amount }
          : obj
      );
      setLocalStorageCart(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      setLocalStorageCart(state.cart);
    },
    openCart: (state) => {
      state.isOpenCart = !state.isOpenCart;
    }
  }
});
function setLocalStorageCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export const { addToCart, deleteFromCart, increaseAmount, decreaseAmount, clearCart, openCart } =
  cartSlice.actions;
export default cartSlice.reducer;
