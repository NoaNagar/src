import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedCards: [],
};

const likedCardsSlice = createSlice({
  name: "likedCards",
  initialState,
  reducers: {
    addLikedCard(state, action) {
      const {
        _id,
        title,
        subtitle,
        phone,
        address,
        img,
        alt,
        like,
        cardNumber,
      } = action.payload;
      const existingCardIndex = state.likedCards.findIndex(
        (card) => card._id === _id
      );

      if (like && existingCardIndex === -1) {
        state.likedCards.push({
          _id,
          title,
          subtitle,
          phone,
          address,
          img,
          alt,
          like,
          cardNumber,
        });
      } else if (!like && existingCardIndex !== -1) {
        state.likedCards.splice(existingCardIndex, 1);
      }
    },
    removeLikedCard(state, action) {
      state.likedCards = state.likedCards.filter(
        (card) => card._id !== action.payload
      );
    },
  },
});

export const { addLikedCard, removeLikedCard } = likedCardsSlice.actions;

export default likedCardsSlice.reducer;
