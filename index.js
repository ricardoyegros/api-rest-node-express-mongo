import express from "express";
import "dotenv/config";
import "./database/db.js";
import authRoutes from "./routes/auth.route.js"

const app = express();

app.use(express.json())// Esto es para que express pueda leer los json por ej al consologuear algo
app.use("/api/v1/",authRoutes)

const PORT = process.env.PORT || 5000

app.listen(5000, ()=>{console.log("ON FIRE!!! http://localhost:" + PORT)});