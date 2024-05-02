import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.js";
// import os from 'os'; // Import the 'os' module

const app = express();
const PORT = 3000;
// const interfaces = os.networkInterfaces();
dotenv.config();

// let HOST = "";
// Object.keys(interfaces).forEach((key) => {
//   interfaces[key].forEach((details) => {
//     if (details.family === "IPv4" && !details.internal) {
//       HOST = details.address;
//     }
//   });
// });

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(router);

app.listen(PORT, () => {
    console.log(`Server ready at localhost:${PORT}`);
});

export default app;
