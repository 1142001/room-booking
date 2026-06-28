import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import ManageRooms from "./pages/ManageRooms";
import ManageBookings from "./pages/ManageBookings";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/rooms" element={<ManageRooms />} />
        <Route path="/admin/bookings" element={<ManageBookings />} />
        <Route
path="/"
  element={
    <PrivateRoute>
      <Home />
    </PrivateRoute>
  }
/>
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;