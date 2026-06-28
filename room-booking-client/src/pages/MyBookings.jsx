import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const cancelBooking = async (id) => {
  try {
    await API.put(`/bookings/cancel/${id}`);

    alert("Booking Cancelled ❌");

    // refresh list
    fetchMyBookings();

  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Cancel Failed");
  }
};

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

        <div className="grid gap-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border p-4 rounded shadow bg-white"
            >
              <h2 className="text-xl font-bold">{b.title}</h2>
              <p>{b.location}</p>
              <p>₹ {b.price}</p>

              <p className="mt-2">
                Status:
                <span className="font-bold text-blue-600 ml-2">
                  {b.status}
                </span>
              </p>

              <button
  onClick={() => cancelBooking(b.id)}
  className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
>
  Cancel Booking
</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;