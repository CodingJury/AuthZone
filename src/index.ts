import dotenv from "dotenv";
import express from "express";

import authRoute from "./routes/Auth.route"
import emailRoute from "./routes/Email.route"
import { globalErrorMiddleare } from "./middlewares/Error.middleware";

dotenv.config()
const app = express();
app.use(express.json())

// TESTING ROUTE
app.get('/', (req, res) => {
  res.json({message: "API is working fine"})
})

// ROUTER
app.use("/auth", authRoute)
app.use("/email", emailRoute)

// GLOBAL ERROR MIDDLEWARE
app.use(globalErrorMiddleare)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})