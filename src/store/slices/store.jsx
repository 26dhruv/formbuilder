import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../slices/slicer";
const store = configureStore({ reducer: { data: dataReducer } });
export default store;
