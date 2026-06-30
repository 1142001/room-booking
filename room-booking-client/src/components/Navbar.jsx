import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">

      {/* Logo */}
      <h1 className="text-xl font-bold tracking-wide">
        🏠 Room Booking
      </h1>

      {/* Links */}
      <div className="flex items-center gap-4">

        <Link to="/" className="hover:text-gray-200">
          Home
        </Link>

        {user && (
          <Link to="/my-bookings" className="hover:text-gray-200">
            My Bookings
          </Link>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/admin" className="hover:text-gray-200">
              Admin
            </Link>

            <Link to="/admin/rooms" className="hover:text-gray-200">
              Rooms
            </Link>

            <Link to="/admin/bookings" className="hover:text-gray-200">
              Bookings
            </Link>
          </>
        )}

        {!user ? (
          <>
            <Link to="/login" className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-200">
              Login
            </Link>

            <Link to="/register" className="border border-white px-3 py-1 rounded hover:bg-white hover:text-blue-700">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
