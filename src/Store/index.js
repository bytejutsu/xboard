import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import draw from "./draw";
import board from "./board";
import app from "./app";

export const reducers = {
  auth,
  draw,
  board,
  app,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
