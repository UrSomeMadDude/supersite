import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counter/counterSlice";
import authSlice from "./auth/authSlice";
import linkSlice from "./links/linkSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        auth: authSlice,
        links: linkSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
