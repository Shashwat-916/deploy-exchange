import express from 'express'
import cors from 'cors'
import tickersRouter from "./routes/tickers.js"

const app = express();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use("/api/tickers", tickersRouter)

app.listen(3001, () => {
   console.log(" Backend server is running 3000 ")
})