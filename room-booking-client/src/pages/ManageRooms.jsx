import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ManageRooms() {
  const [rooms, setRooms] = useState([]);

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    image: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await API.get("/rooms");
    setRooms(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/rooms/update/${editingId}`, form);
      } else {
        await API.post("/rooms/add", form);
      }

      setForm({
        title: "",
        location: "",
        price: "",
        description: "",
        image: ""
      });

      setEditingId(null);
      fetchRooms();

    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const deleteRoom = async (id) => {
    await API.delete(`/rooms/delete/${id}`);
    fetchRooms();
  };

  // EDIT
  const editRoom = (room) => {
    setForm(room);
    setEditingId(room.id);
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-4">
          Manage Rooms
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid gap-2 mb-6">

          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2" />

          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2" />

          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2" />

          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border p-2" />

          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2" />

          <button className="bg-blue-600 text-white p-2">
            {editingId ? "Update Room" : "Add Room"}
          </button>

        </form>

        {/* LIST */}
        <div className="grid gap-4">

          {rooms.map((room) => (
            <div key={room.id} className="border p-4 rounded shadow">

              <h2 className="font-bold">{room.title}</h2>
              <p>{room.location}</p>
              <p>₹ {room.price}</p>

              <div className="flex gap-2 mt-2">

                <button
                  onClick={() => editRoom(room)}
                  className="bg-yellow-500 px-3 py-1 text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteRoom(room.id)}
                  className="bg-red-500 px-3 py-1 text-white"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default ManageRooms;