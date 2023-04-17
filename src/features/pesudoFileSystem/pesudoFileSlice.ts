import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface PesudoFileState {
    files: string[];
}

const initialState: PesudoFileState = {
    files: [],
};

export const pesudoFSSlice = createSlice({
    name: "pesudoFS",
    initialState,
    reducers: {
        setFiles: (state, action) => {
            state.files = action.payload;
        }
    }
});

export const { setFiles } = pesudoFSSlice.actions;
export const selectFiles = (state: RootState) => state.pesudoFS.files;
    export default pesudoFSSlice.reducer;