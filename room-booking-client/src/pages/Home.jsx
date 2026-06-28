import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Home() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await API.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const bookRoom = async (roomId) => {
    try {
      await API.post("/bookings/add", {
        room_id: roomId
      });

      alert("Room Booked Successfully 🎉");

    } catch (err) {
      alert(err.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="border rounded-lg shadow p-4 bg-white hover:scale-105 transition">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border rounded-lg shadow p-4 bg-white"
          >
            <h2 className="text-xl font-bold">{room.title}</h2>
            <p className="text-gray-600">{room.location}</p>
            <p className="font-semibold">₹ {room.price}</p>
            <p className="text-sm mt-2">{room.description}</p>

            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              Book Now
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Home;