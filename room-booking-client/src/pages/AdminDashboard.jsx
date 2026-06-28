import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersRes = await API.get("/admin/users");
      const roomsRes = await API.get("/rooms");
      const bookingsRes = await API.get("/admin/bookings");

      setUsers(usersRes.data);
      setRooms(roomsRes.data);
      setBookings(bookingsRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">

          <div className="bg-blue-500 text-white p-4 rounded">
            Total Users: {users.length}
          </div>

          <div className="bg-green-500 text-white p-4 rounded">
            Total Rooms: {rooms.length}
          </div>

          <div className="bg-purple-500 text-white p-4 rounded">
            Total Bookings: {bookings.length}
          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;