import App from "./app.js";

import dotenv from "dotenv";
dotenv.config();

const port = +process.env.PORT || 8000;

App.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
})