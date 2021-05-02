import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

const store = configureStore({
    reducer: {
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend().concat(logger)
})

export type AppDispatch = typeof store.dispatch;

export type AppAction = {
    type: string;
    payload?: any;
}

export default store;