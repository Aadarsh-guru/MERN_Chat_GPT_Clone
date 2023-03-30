import express from "express";
import cors from 'cors'
import morgan from "morgan";
import Connection from "./database/db.js";
import dotenv from "dotenv"
import authRoutes from './routes/authRoutes.js'
import openAiRoutes from './routes/openAiRoutes.js'
const app = express()
const port = process.env.PORT || 80;
app.use(cors())
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/openai', openAiRoutes)
Connection()
dotenv.config()

app.listen(port, () => { console.log(`server is running on port ${port}`); })