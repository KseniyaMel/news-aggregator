import { store } from "../../strore";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
