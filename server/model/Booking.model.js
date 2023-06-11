const mongoose = require("mongoose")


// basic structure of the data
const bookingSchema = mongoose.Schema({
    row:{type:Number, required:true},
    seatnumber: {type:String, required: true},
    isBooked:{type:Boolean,default:false}
},{
    versionKey:false
})

const BookingModel = mongoose.model("seat", bookingSchema)

module.exports = {
    BookingModel
}