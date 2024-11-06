import { createSlice } from '@reduxjs/toolkit';

const storeResetSlice = createSlice({
    name: 'storeReset',
    initialState: {},
    reducers: {
        reset: (state) => {
            return {};
        },
    },
});

export const { reset } = storeResetSlice.actions;

export default storeResetSlice.reducer;
