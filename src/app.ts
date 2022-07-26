import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";
import router from "./routers/index.js";
dotenv.config();

const App = express();

App.use(json());
App.use(router);
App.use(errorHandler);

export default App;