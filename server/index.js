const express = require("express")
const cors = require("cors");
const { BookingRouter } = require("./routes/Booking.routes")
const { connection } = require("./config/db")
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

// app.get("/", (req,res) => {
//     res.send("Welcome")
// })

app.use("/", BookingRouter)

app.listen(process.env.port, async() => {
    try{
        await connection
        console.log("connected to the DB")
    }catch(err){
        console.log("cannot connect to DB")
        console.log(err)
    }
    console.log(`server is runnig at port ${process.env.port}`)
})