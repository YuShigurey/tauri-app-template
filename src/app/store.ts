import { configureStore } from '@reduxjs/toolkit'

import selectorSlice from '../features/pykernel/selectorSlice'
import pesudoFSSlice from '../features/pesudoFileSystem/pesudoFileSlice'

export const store = configureStore({
    reducer: {
        kernelSelector: selectorSlice,
        pesudoFS: pesudoFSSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch