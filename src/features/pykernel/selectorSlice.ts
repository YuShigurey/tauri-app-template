import { createSlice } from '@reduxjs/toolkit';
// import { Kernel } from '@jupyterlab/services';
import { PyodideInterface } from 'pyodide';
import { RootState } from '../../app/store';

// Define a type for the slice state
interface KernelState {
    kernel: PyodideInterface|null 
}
  
// Define the initial state using that type
const initialState: KernelState = {
    kernel: null
}

export const selectorSlice = createSlice({
    name: 'kernelSelector',
    initialState,
    reducers: {
        setKernel: (state, action) => {
            state.kernel = action.payload;
        },
    }
});

export const { setKernel } = selectorSlice.actions;
export const selectKernel = (state: RootState) => state.kernelSelector.kernel;
export default selectorSlice.reducer;

