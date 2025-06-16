import { configureStore } from "@reduxjs/toolkit";
import  employeeReducer  from "../slices/crudSlices";

const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
});

export default store;
