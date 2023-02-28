import app from "./app";
import mongoose from "mongoose";
require('dotenv').config();

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGOOSE_CONNECTION!).then(() => {
    console.log('DB CONNECTED');
    app.listen(PORT, () => {
        console.log("Server running on port :" + PORT)
    });
}).catch(console.error);

