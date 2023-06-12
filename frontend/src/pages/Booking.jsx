import React, { useEffect, useState } from "react";
import axios from "axios";
import "./booking.css";
const Booking = () => {
  const [product, setProduct] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("https://kind-tan-lamb-gear.cyclic.app");
      console.log(res.data.seat);
      setProduct(res.data.seat);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    axios
      .post(`https://kind-tan-lamb-gear.cyclic.app/post`, { seatNumber: text })
      .then(({ data }) => {console.log(data);
        getData()
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="input-box">
        <input
          type="number"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn" onClick={handleClick}>
          Book
        </button>
      </div>
      <h1>Seats</h1>
      <div className="container">
        {product.map((elem) => {
          return (
            <button
              className={elem.isBooked ? "btncolor" : "btncolor1"}
              key={elem._id}
            >
              {elem.seatnumber}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Booking;
