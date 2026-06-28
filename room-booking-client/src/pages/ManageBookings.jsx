import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/admin/bookings");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Confirm booking
  const confirmBooking = async (id) => {
    try {
      await API.put(`/admin/bookings/confirm/${id}`);
      fetchBookings();
    } catch (err) {
      console.log(err);
    }
  };

  // Cancel booking
  const cancelBooking = async (id) => {
    try {
      await API.put(`/admin/bookings/cancel/${id}`);
      fetchBookings();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-4">
          Manage Bookings
        </h1>

        <div className="grid gap-4">

          {bookings.map((b) => (
            <div key={b.id} className="border p-4 rounded shadow">

              <h2 className="font-bold">{b.title}</h2>
              <p>User ID: {b.user_id}</p>
              <p>Room ID: {b.room_id}</p>

              <p className="mt-2">
                Status:
                <span className="ml-2 font-bold text-blue-600">
                  {b.status}
                </span>
              </p>

              <div className="flex gap-2 mt-3">

                <button
                  onClick={() => confirmBooking(b.id)}
                  className="bg-green-600 text-white px-3 py-1"
                >
                  Confirm
                </button>

                <button
                  onClick={() => cancelBooking(b.id)}
                  className="bg-red-500 text-white px-3 py-1"
                >
                  Cancel
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default ManageBookings;