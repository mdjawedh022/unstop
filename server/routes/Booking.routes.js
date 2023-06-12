const express = require("express");
const { BookingModel } = require("../model/Booking.model");

const BookingRouter = express.Router();

BookingRouter.get("/", async (req, res) => {
  try {
    const seat = await BookingModel.find();
    console.log(seat);
    res.send({ seat });
  } catch (err) {
    res.send({ msg: "Can not read", err: err.message });
  }
});

BookingRouter.post("/post", async (req, res) => {
  const { seatNumber } = req.body;
  if (seatNumber > 7) {
    res.status(400).send({ msg: "Seat limit exceed" });
    return;
  }
  try {
    const seat = await BookingModel.find();

    let count = 0;
    let row = 1;
    let obj = {};
    for (let a = 0; a < seat.length; a++) {
     
      // console.log(count,seatNumber)
     
      if (seat[a].row == row && count <= seatNumber) {
        if (!seat[a].isBooked) {
          
          obj[count] = seat[a].id;
          count++;
          
        }else{
          count=0
          continue;
        }
      }
    
      if(seat[a].row > row && count != seatNumber){
        row++
        count=0
      }
       // console.log(count,seatNumber)
       if (count == seatNumber) {
        // console.log("break")
        break;
      }
      
    }
    
    // console.log("booked",obj)

    for(let key in obj){
        await BookingModel.findByIdAndUpdate({_id:obj[key]},{isBooked:true})
    }
 
    res.send({ MSG: "seat has been booked" });
  } catch (err) {
    res.send({ msg: "Can not register", err: err.message });
  }
});

BookingRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await BookingModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({ msg: "update successfull!" });
  } catch (err) {
    console.log(err);
  }
});
module.exports = { BookingRouter };
