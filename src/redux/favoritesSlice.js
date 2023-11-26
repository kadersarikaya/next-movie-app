import { createSlice } from "@reduxjs/toolkit";


export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        toggleFavorite: (state,action) => {
            const {id} = action.payload;
            state[id] = !state[id]
        },
    },
});

export const {toggleFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;